# Solar System Animation

An interactive 3D solar system animation built with Three.js and GSAP, featuring realistic planetary motion, orbital mechanics, and educational information about each planet.

# Github link:
https://github.com/sam-eer12/solar-system

## Features

- **3D Interactive Solar System** - Explore our solar system in full 3D with mouse/touch controls
- **Realistic Orbital Motion** - Planets orbit at different speeds based on real astronomical data
- **Educational Information** - Click on any planet to learn interesting facts
- **Animation Controls** - Play/pause animations and adjust orbital speed
- **Visual Orbit Paths** - Clear orbital lines show planetary trajectories
- **Stunning Visuals** - Starfield background, glowing sun, and Saturn's rings
- **Responsive Design** - Works on desktop, tablet, and mobile devices

## Technologies Used

- **Three.js** - 3D graphics and WebGL rendering
- **GSAP** - Smooth animations and timeline control
- **HTML5 Canvas** - Hardware-accelerated 3D rendering
- **ES6 Modules** - Modern JavaScript architecture
- **CSS3** - Modern styling and responsive design

## Planets Included

- Mercury - Closest to the Sun
- Venus - Hottest planet with thick atmosphere
- Earth - Our home planet with water and life
- Mars - The Red Planet with polar ice caps
- Jupiter - Largest planet with the Great Red Spot
- Saturn - Famous for its prominent ring system
- Uranus - Ice giant tilted on its side
- Neptune - Windiest planet in our solar system

## How to Run

### Option 1: Simple File Opening
1. Download or clone this repository
2. Open `index.html` in a modern web browser
3. The animation will start automatically

**Using VS Code:**
- Install "Live Server" extension
- Right-click on `index.html`
- Select "Open with Live Server"

Then open your browser and navigate to `http://localhost:8000`

## Controls

### Mouse/Touch Controls
- **Orbit** - Left click + drag to rotate view
- **Zoom** - Scroll wheel or pinch to zoom in/out
- **Pan** - Right click + drag to pan around

### UI Controls
- **Speed Slider** - Adjust animation speed (0.1x to 5x)
- **Play/Pause Button** - Stop or resume all animations
- **Reset View** - Return camera to default position
- **Planet Clicking** - Click any planet to see information

## File Structure

```
solar-system/
├── index.html          # Main HTML file with Three.js and GSAP setup
├── script.js           # Main JavaScript with 3D scene and animations
├── style.css           # CSS styling for UI and responsive design
├── README.MD           # Project documentation
├── LICENSE             # License file
└── assets/
    └── favicon.png     # Website favicon
```

## Browser Compatibility

This project requires a modern browser with WebGL support:

- **Chrome** 58+ ✅
- **Firefox** 53+ ✅
- **Safari** 11+ ✅
- **Edge** 79+ ✅
- **Mobile browsers** - iOS Safari 11+, Chrome Mobile 58+ ✅

## Performance Notes

- **Optimized for smooth 60fps** on modern devices
- **10,000 stars** in background for realistic space environment
- **Efficient orbital calculations** using trigonometry
- **Hardware-accelerated rendering** via WebGL
- **Responsive to screen size** and device capabilities

## Educational Use

Perfect for:
- **Science classrooms** - Teaching planetary motion and orbital mechanics
- **Astronomy education** - Visual representation of our solar system
- **Interactive learning** - Hands-on exploration of space
- **STEM demonstrations** - Combining physics, math, and technology

## Customization

You can easily customize the solar system by modifying the `planetData` array in `script.js`:

```javascript
const planetData = [
    {
        name: 'Planet Name',
        radius: 2.5,           // Planet size
        distance: 45,          // Distance from sun
        speed: 1.0,            // Orbital speed multiplier
        color: 0x6B93D6,       // Planet color (hex)
        info: 'Planet description'
    }
];
```

## Contributing

Feel free to contribute to this project by:
- Adding more celestial bodies (moons, asteroids, comets)
- Improving visual effects and materials
- Adding more educational content
- Optimizing performance
- Enhancing mobile experience

## License

This project is open source and available under the [MIT License](LICENSE).

## Credits

- **Three.js** - 3D graphics library
- **GSAP** - Animation library
- **Astronomical data** - Based on real planetary characteristics
- **Inspiration** - NASA and space exploration missions

---

🚀 **Explore the cosmos and learn about our amazing solar system!** 🌍🪐✨