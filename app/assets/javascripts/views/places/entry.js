Teikei.module("Places", function(Places, App, Backbone, Marionette, $, _) {

  Places.EntryView = Teikei.Base.ItemView.extend({

    className: "reveal-modal xlarge",
    template: "places/entry",

    ui: {
      headline: ".headline",
      formContainer: ".forms",
      nextButton: ".next",
      prevButton: ".prev",
      submitButton: ".submit",
      cityInput: ".city input",
      addressInput: ".address input",
      previewMap: ".preview-map",
      previewMarker: ".preview-marker",
      previewButton: ".preview-button"
    },

    events: {
      "click .next": "onNextClick",
      "click .prev": "onPrevClick",
      "click .submit": "onSubmitClick"
    },

    placeholderSource: "/assets/preview-placeholder.png",

    // Override this with a schema for the actual form:
    schemata: {},

    initialize: function(options) {
      this.headline = options.headline;
    },

    updateUi: function() {
      this.bindUIElements();
      this.ui.headline.text(this.headline);

      var step = this.step;
      var length = this.forms.length-1;

      if (step >= length) {
        this.ui.nextButton.hide();
        this.ui.prevButton.show();
        this.ui.submitButton.show();
      }
      else if (step <= 0) {
        this.ui.nextButton.show();
        this.ui.prevButton.hide();
        this.ui.submitButton.hide();
      }
      else {
        this.ui.nextButton.show();
        this.ui.prevButton.show();
        this.ui.submitButton.hide();
      }
    },

    onRender: function() {
      var $el = this.$el;
      var $container = this.ui.formContainer;
      var view = this;
      var schemata = this.schemata();
      var forms = [];

      _.each(schemata, function(schema, formId) {
        var templateFile = Marionette.Renderer.render("places/forms/" + formId);
        var form = new Backbone.Form({
          model: this.model,
          schema: schema,
          template: _.template(templateFile)
        }).render();

        forms.push(form);
        form.$el.hide();
        $container.append(form.$el);
      }, this);

      _.defer(function(){
        forms[0].$el.show();
      });

      this.forms = forms;
      this.step = 0;
      this.updateUi();
    },

    onNextClick: function() {
      var forms = this.forms;
      var errors = forms[this.step].validate();
      if (errors === null) {
        this.forms[this.step].$el.hide();
        this.forms[++this.step].$el.show();
        this.updateUi();
      }
    },

    onPrevClick: function() {
      this.forms[this.step].$el.hide();
      this.forms[--this.step].$el.show();
      this.updateUi();
    },

    onSubmitClick: function(event) {
      var self = this;
      var model = this.model;
      var errors = this.forms[this.step].validate();

      if (errors === null) {
        this.hideAlertMessage(true);
        _.each(this.forms, function(form) {
          var value = form.getValue();

          // flatten geocoder attributes
          if (value.hasOwnProperty("geocoder")){
            _.extend(value, value.geocoder);
            delete value.geocoder;
          }

          model.set(value);
        });

        model.save({}, {
          success: function(model, response, options) {
            self.collection.add(model, { merge : true });
            self.closeView();
            Teikei.Alert.renderPlaceCreateSuccess(model);
          },
          error: function(model, xhr, options) {
            self.showAuthorizationError(xhr);
          }
        });
      }
    },

    showAuthorizationError: function(xhr) {
      this.showError(xhr, "Für diese Aktion fehlen dir die nötigen Rechte.");
    }

  });
});
