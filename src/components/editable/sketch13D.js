// eslint-disable-next-line
function sketch(parent) { // we pass the sketch data from the parent
  return function( p ) { // p could be any variable name

    // p5 sketch goes here

    p.setup = function() {
      // eslint-disable-next-line
      let canvas = p.createCanvas(710, 400, p.WEBGL);
      canvas.parent(parent.$el);
      // p.rectMode(p.CENTER);
    };

    p.draw = function() {
    //  p.background(255,0,0);
    //  p.fill(255);
      // p.rect(parent.data.x, parent.data.y, 50, 50);
      // p.fill(0);
      // p.text('Drag\nme!', parent.data.x - 12, parent.data.y - 5);
       p.background(250);

       p.translate(-240, -100, 0);
       p.normalMaterial();
       p.push();
       p.rotateZ(p.frameCount * 0.01);
       p.rotateX(p.frameCount * 0.01);
       p.rotateY(p.frameCount * 0.01);
       p.plane(70);
       p.pop();

       p.translate(240, 0, 0);
       p.push();
       p.rotateZ(p.frameCount * 0.01);
       p.rotateX(p.frameCount * 0.01);
       p.rotateY(p.frameCount * 0.01);
       p.box(70, 70, 70);
       p.pop();

       p.translate(240, 0, 0);
       p.push();
       p.rotateZ(p.frameCount * 0.01);
       p.rotateX(p.frameCount * 0.01);
       p.rotateY(p.frameCount * 0.01);
       p.cylinder(70, 70);
       p.pop();

       p.translate(-240 * 2, 200, 0);
       p.push();
       p.rotateZ(p.frameCount * 0.01);
       p.rotateX(p.frameCount * 0.01);
       p.rotateY(p.frameCount * 0.01);
       p.cone(70, 70);
       p.pop();

       p.translate(240, 0, 0);
       p.push();
       p.rotateZ(p.frameCount * 0.01);
       p.rotateX(p.frameCount * 0.01);
       p.rotateY(p.frameCount * 0.01);
       p.torus(70, 20);
       p.pop();

       p.translate(240, 0, 0);
       p.push();
       p.rotateZ(p.frameCount * 0.01);
       p.rotateX(p.frameCount * 0.01);
       p.rotateY(p.frameCount * 0.01);
       p.sphere(70);
       p.pop();



    };

    p.mouseDragged = function() {
      // check that input came from within this canvas
      if (0 < p.mouseX && p.mouseX < p.width && 0 < p.mouseY && p.mouseY < p.height)
      {
        parent.$emit('update:x', p.round(p.mouseX) );
        parent.$emit('update:y', p.round(p.mouseY) );
      }
    }

  };
}
module.exports = sketch;
