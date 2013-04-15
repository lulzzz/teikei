Teikei.module("Places", function(Places, App, Backbone, Marionette, $, _) {

  Places.EntryFarmView = Places.EntryView.extend({

    initialize: function(options) {
      this.model.set("type", "Farm");
      Places.EntryView.prototype.initialize.apply(this, arguments);
    },

    schemata: function() {
      return {
        entryFarmBasics: {
          name: { type: "Text", title: "Name des Hofs", validators: ["required"] },
          address: { type: "Text", title: "Straße und Hausnummer", validators: ["required"] },
          city: { type: "Text", title: "PLZ und Ort", validators: ["required"] }
        },
        entryFarmDetails: {
          description: { type: "TextArea", title: "Beschreibung" },
          products: { type: "Text", title: "Erzeugnisse" },
          founded_at: { type: "Date", title: "Solidarische Landwirtschaft seit (Jahr)" },
          farming_standard: { type: "Text", title: "Anbaustandards" },
          is_solawi_member: { type: "Checkbox", title: "Der Betrieb ist Mitglied im Netzwerk Solidarische Landwirtschaft" }
        },
        entryFarmMembership: {
          accepts_new_members: { type: "YesNoCheckbox", title: "Wir haben noch freie Kapazität und suchen neuen Mitglieder" },
          maximum_members: { type: "Text", title: "Maximale Mitgliederzahl" },
          participation: { type: "TextArea", title: "Wie können sich die Mitglieder aktiv einbringen?" }
        },
        entryFarmContact: {
          contact_name: { type: "Text", title: "Name", validators: ["required"] },
          contact_email: { type: "Text", title: "Email", validators: ["required", "email"] },
          contact_phone: { type: "Text", title: "Telefonnummer", validators: ["required"] }
        }
      };
    }

  });
});
