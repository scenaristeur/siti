<template>
  <div>
    1
    <div class="container border">
      <div class="d-flex justify-content-center" style="height:500px" id="p5Canvas"></div>
    </div>
    2
  </div>
</template>

<script>
import p5 from 'p5';



const s = ( sketch ) => {

  let x = 100;
  let y = 100;

  sketch.setup = () => {
    // sketch.createCanvas(200, 200);
    var canvas = sketch.createCanvas(500,500)
    canvas.parent("p5Canvas")
  };

  sketch.draw = () => {
    sketch.background(0);
    sketch.fill(255);
    sketch.rect(x,y,50,50);
  };
  console.log(sketch)
};

let myp5 = new p5(s);
console.log(myp5)



export default {
  name: "Graphe",
  mounted() {

    // p5._setup = function (p5){
    //   var canvas = p5.createCanvas(500,500)
    //   canvas.parent("p5Canvas")
    // }
    // const script = function (p5) {
    //   var speed = 2;
    //   var posX = 0;
    //
    //   // p5.createCanvas(500, 500);
    //   var canvas = p5.createCanvas(500, 500)
    //   canvas.parent("p5Canvas");
    //
    //   // NOTE: Set up is here
    //   // eslint-disable-next-line
    //   p5.setup = _ => {
    //     p5.createCanvas(500, 500);
    //     p5.ellipse(p5.width / 2, p5.height / 2, 500, 500);
    //   }
    //   // NOTE: Draw is here
    //   // eslint-disable-next-line
    //   p5.draw = _ => {
    //     p5.background(0);
    //     const degree = p5.frameCount * 3;
    //     const y = p5.sin(p5.radians(degree)) * 50;
    //
    //     p5.push();
    //     p5.translate(0, p5.height / 2);
    //     p5.ellipse(posX, y, 50, 50);
    //     p5.pop();   posX += speed;
    //
    //     if (posX > p5.width || posX < 0) {
    //       speed *= -1;
    //     }
    //   }
    // }    // NOTE: Use p5 as an instance mode
    // // const P5 = require('p5');
    // // new P5(script)}
    // let g = new P5(script)
    // console.log("p5",g)

  }
}
</script>

<style>

</style>
