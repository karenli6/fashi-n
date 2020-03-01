var clothing1= {'rayon': '77', 'nylon': '20', 'spandex': ' 3'};


var clothing_h2O = { "cotton": 273, "wool": 197, "silk": 5117, "flax": 182, "linen": 182, "viscose": 337, "polyester": 7, "acrylic": 11, "rayon": 2640, "spandex": 7 };
var clothing_weights = { "top": 0.33, "pants": 0.875, "jacket": 2.5, "dress": 1 };
type1='dress';

var w1 = 0;
for (var val in clothing_weights) {
  if (val === type1) {
    w1 = clothing_weights[val];
  }
}
var water1 = 0;
for (var item in clothing1) {
  for (var val in clothing_h2O) {
    // console.log("val is "+val + " and item is "+item);
    if (val === item) {
        clothing1[item]/=100;
        console.log(clothing1[item]);
      water1 += (clothing1[item]/100) * clothing_h2O[val];
      console.log("water1 is "+ water1);

    }
  }
}

water1 *= w1;
console.log(water1);