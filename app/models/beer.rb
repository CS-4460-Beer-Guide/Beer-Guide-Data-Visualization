class Beer < ActiveRecord::Base
  validates :name, uniqueness: true
  
  def self.import()
    CSV.foreach("data/beers.csv") do |row|
      #branch, family, sub_family, name, brewery, abv, ibu, region

      if $. > 1
        Beer.create(name: row[3],
                    branch: row[0],
                    family: row[1],
                    sub_family: row[2],
                    brewery: row[4],
                    abv: row[5],
                    ibu: row[6],
                    region: row[7]
        )
      end
    end
  end
  
end