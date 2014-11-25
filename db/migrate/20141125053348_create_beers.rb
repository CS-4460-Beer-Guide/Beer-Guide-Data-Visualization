class CreateBeers < ActiveRecord::Migration
  def change
    create_table :beers do |t|
      t.string :name
      t.string :branch
      t.string :family
      t.string :sub_family
      t.string :brewery
      t.float :abv
      t.integer :ibu
      t.string :region

      t.timestamps
    end
  end
end
