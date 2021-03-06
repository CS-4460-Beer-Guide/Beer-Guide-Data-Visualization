class ApiController < ApplicationController
  skip_before_action :verify_authenticity_token

  layout false
  
  def user_params
    return params.except(:action, :controller)
  end
  
  def beers
    if params[:type]=="all_beer"
      
      beers_as_json = Beer.all.as_json(except: [:id, :created_at, :updated_at])
      params[:type_name] = "ALL BEER"
    elsif params[:type] == "family"
      beers_as_json = Beer.where(family: params[:type_name]).as_json(except: [:id, :created_at, :updated_at])
    elsif params[:type] == "sub_family"
      beers_as_json = Beer.where(sub_family: params[:type_name]).as_json(except: [:id, :created_at, :updated_at])
    elsif params[:type] == "branch"
      beers_as_json = Beer.where(branch: params[:type_name]).as_json(except: [:id, :created_at, :updated_at])
    end
    
    render :json=> [{type: params[:type_name], data: beers_as_json }] , :status=>200    
    
    
  end
  
  def families
    
    families = Beer.select(:family).group(:family).collect(&:family).as_json
    
    render :json=> families, :status=>200
    
  end
  
  def sub_families
    
    sub_families = Beer.select(:sub_family).where(family: params[:family]).group(:sub_family).collect(&:sub_family).as_json
    
    render :json=> sub_families, :status=>200
  end
  
  def all_beers
    beers_json = {
                  name: "ALL BEER",
                  children: [
                    {
                      name: "LAGER",
                      type: "branch",
                      children: families_as_json("LAGER")
                      
                    },
                    {
                      name: "ALE",
                      type: "branch",
                      children: families_as_json("ALE")
                    }
                  ]
                }
                
    render :json=> beers_json, :status=>200
    
  end
  
  def families_as_json(branch)
    families = Beer.select(:family).where(branch: branch).group(:family).collect(&:family)
    families.map{ |e| family_as_json(e)}
    
  end
  
  def family_as_json(family)
    sub_families =  sub_families = Beer.select(:sub_family).where(family: family).group(:sub_family).collect(&:sub_family)
    {
      name: family,
      type: "family",
      children: sub_families_as_json(sub_families)
    }
    
  end
  
  def sub_families_as_json(sub_families)
    sub_families.map{ |e| sub_family_as_json(e)}
  end
  
  def sub_family_as_json(sub_family)
    {
      name: sub_family,
      type: "sub_family"
    }
    
  end

end