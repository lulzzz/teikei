class ApplicationController < ActionController::Base
  before_filter :authenticate_beta_user

  rescue_from CanCan::AccessDenied do |exception|
    redirect_to root_path, :alert => exception.message
  end

  def auth_token
    request.headers['auth_token']
  end

  def authenticate_beta_user
    authenticate_user! if ENV['CLOSED_BETA_AUTHENTICATION'] == 'on'
  end

  # Method name must match with `config.authentication_method`
  # in `config/initializers/active_admin.rb`
  def authenticate_active_admin_user!
    authenticate_user!
    unless current_user.has_role? :superadmin
      flash[:alert] = t("errors.authorization_denied")
      redirect_to root_path
    end
  end

end
