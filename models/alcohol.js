class Alcohol {
  constructor(name, type, abv, country, details) {
    this.name = name;  
    this.type = type;      
    this.abv = abv;       
    this.country = country;
    this.details = details;
  }
}

class AlcoholDetails {
  constructor(distillery, year, awards) {
    this.distillery = distillery;  
    this.year = year;
    this.awards = awards;
  }
}

module.exports = { Alcohol, AlcoholDetails };
