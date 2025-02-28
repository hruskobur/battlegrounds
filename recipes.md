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

## The ECS architecture

### Component
- data only
- no nested components
- no logic
- no getters, no setters
- initial values have to be set in the constructor
- extension of component classes is allowed

### Entity
- contains multiple components
- unlike the pure-ECS, entities are specialized - e.g. they have pre-defined
set of components
- no nested entities
- no logic
- no getters, no settersa
- have their components' properties set to values, that represent uninitialized
state (null, -1, Number.MIN_SAFE_INTEGER, '', {}, [], ...)
- extension of entity classes is allowed

### System
- provides functionality to modify components of various system-relevant 
entities
- public API functions have every relevant input specified as argument
- systems communicate among self using the event-emit functionality (observer
pattern)

### GameState
- the "world" in the ECS terms
- contains all entities and all systems
- may contain addtional data
- nested entities or nested components are represented as GameXYZ classes 
here