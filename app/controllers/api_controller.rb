class ApiController < ApplicationController
  skip_before_action :verify_authenticity_token

  layout false
  
  def user_params
    return params.except(:action, :controller)
  end
  
  def beers
    beers_as_json = Beer.where(user_params).as_json(except: [:id, :created_at, :updated_at])

    
    render :json=> beers_as_json, :status=>200
    
  end
  
  def families
    
    families = Beer.select(:family).group(:family).collect(&:family).as_json
    
    render :json=> families, :status=>200
    
  end
  
  def sub_families
    
    sub_families = Beer.select(:sub_family).where(family: params[:family]).group(:sub_family).collect(&:sub_family).as_json
    
    render :json=> sub_families, :status=>200
  end

end