# Recipes!
The code here is for some reason or another not used - function is not needed yet, it is not needed at all, but it is interesting, etc...

## When sprite is outside of a Viewport visible boundary, set its visible flag to false

So... i tested this with 4096 sprites and it doesn't matter, update takes ~0.1 ms.

But, this may be just because of my PC **OR MAYBE** Viewport is doing some culling behind the scenes...

If at any point a manual determination whether sprite should or shouldn't be drawn is needed, use this:

```javascript
this.container.on('moved', e => {
    const _start = performance.now();
    
    const viewport_boundaries = this.container.getVisibleBounds();
    this.container.children.forEach(area => {
        area.visible = viewport_boundaries.contains(area.x, area.y);
    });

    const _end = performance.now();
    
    console.log('moved', (_end - _start));
});
```

It is **MANDATORY** to have Viewport instance set-up correctly with
world* & screen* dimensions

```javascript
this.container = new Viewport(
    {
        worldHeight: SIZE * 64,
        worldWidth: SIZE * 64,
        screenHeight: 1000,
        screenWidth: 1000,
        events: renderer.events
    }
).drag();

```

## Manual update loop

See the code below...

```javascript
// turn off autostart
PixiApp.ticker.autoStart = false;
// stop ticker
PixiApp.ticker.stop();
// add custom update loop
PixiApp.ticker.add(
    () => {
    const _start = performance.now();
    
    PixiApp.renderer.render(PixiApp.stage);
    
    const _end = performance.now();
            
    console.log(_end - _start);
});

// start ticker
PixiApp.ticker.start();
```