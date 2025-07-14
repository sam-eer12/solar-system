import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let scene, camera, renderer, controls;
let sun, planets = [];
let animationSpeed = 1;
let isPaused = false;

const planetData = [
    {
        name: 'Mercury',
        radius: 1.5,
        distance: 25,
        speed: 4.74,
        color: 0x8C7853,
        info: 'Closest planet to the Sun. No atmosphere.'
    },
    {
        name: 'Venus',
        radius: 2.2,
        distance: 35,
        speed: 1.85,
        color: 0xFFC649,
        info: 'Hottest planet with thick atmosphere.'
    },
    {
        name: 'Earth',
        radius: 2.5,
        distance: 45,
        speed: 1.0,
        color: 0x6B93D6,
        info: 'Our home planet with water and life.'
    },
    {
        name: 'Mars',
        radius: 2.0,
        distance: 55,
        speed: 0.53,
        color: 0xC1440E,
        info: 'The Red Planet with polar ice caps.'
    },
    {
        name: 'Jupiter',
        radius: 6.0,
        distance: 75,
        speed: 0.084,
        color: 0xD8CA9D,
        info: 'Largest planet with a Great Red Spot.'
    },
    {
        name: 'Saturn',
        radius: 5.0,
        distance: 95,
        speed: 0.034,
        color: 0xFAD5A5,
        info: 'Famous for its prominent ring system.',
        hasRings: true
    },
    {
        name: 'Uranus',
        radius: 3.5,
        distance: 115,
        speed: 0.012,
        color: 0x4FD0E4,
        info: 'Ice giant tilted on its side.'
    },
    {
        name: 'Neptune',
        radius: 3.2,
        distance: 135,
        speed: 0.006,
        color: 0x4B70DD,
        info: 'Windiest planet in our solar system.'
    }
];

function init() {
    scene = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 50, 100);
    
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000);
    document.body.appendChild(renderer.domElement);
    
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    
    setupLights();
    
    createStarfield();
    
    createSun();
    
    createPlanets();
    
    setupUI();
    
    animate();
}

function setupLights() {
    const ambientLight = new THREE.AmbientLight(0x404040, 0.1);
    scene.add(ambientLight);
    
    const sunLight = new THREE.PointLight(0xffffff, 2, 300);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);
}

function createStarfield() {
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5 });
    
    const starsVertices = [];
    for (let i = 0; i < 10000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        starsVertices.push(x, y, z);
    }
    
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
}

function createSun() {
    const sunGeometry = new THREE.SphereGeometry(8, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xfdb813,
        emissive: 0xfdb813,
        emissiveIntensity: 0.3
    });
    
    sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);
    
    const glowGeometry = new THREE.SphereGeometry(12, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0xfdb813,
        transparent: true,
        opacity: 0.1
    });
    const sunGlow = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(sunGlow);
    
    gsap.to(sun.rotation, {
        y: Math.PI * 2,
        duration: 10,
        repeat: -1,
        ease: "none"
    });
}

function createPlanets() {
    planetData.forEach((data, index) => {
        const planetGeometry = new THREE.SphereGeometry(data.radius, 32, 32);
        const planetMaterial = new THREE.MeshLambertMaterial({ color: data.color });
        const planet = new THREE.Mesh(planetGeometry, planetMaterial);
        
        planet.position.x = data.distance;
        planet.userData = data;
        
        createOrbitLine(data.distance);
        
        if (data.hasRings) {
            const ringGeometry = new THREE.RingGeometry(data.radius + 1, data.radius + 3, 32);
            const ringMaterial = new THREE.MeshBasicMaterial({
                color: 0xaaaaaa,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.6
            });
            const rings = new THREE.Mesh(ringGeometry, ringMaterial);
            rings.rotation.x = Math.PI / 2;
            planet.add(rings);
        }
        
        scene.add(planet);
        planets.push({
            mesh: planet,
            data: data,
            angle: Math.random() * Math.PI * 2
        });
        
        gsap.to(planet.rotation, {
            y: Math.PI * 2,
            duration: 5 + Math.random() * 10,
            repeat: -1,
            ease: "none"
        });
        
        animatePlanetOrbit(planets[planets.length - 1]);
    });
}

function createOrbitLine(radius) {
    const orbitGeometry = new THREE.RingGeometry(radius - 0.2, radius + 0.2, 64);
    const orbitMaterial = new THREE.MeshBasicMaterial({
        color: 0x888888,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8
    });
    const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
    orbit.rotation.x = Math.PI / 2;
    scene.add(orbit);
}

function animatePlanetOrbit(planetObj) {
    const timeline = gsap.timeline({ repeat: -1 });
    
    timeline.to(planetObj, {
        angle: planetObj.angle + Math.PI * 2,
        duration: 20 / (planetObj.data.speed * animationSpeed),
        ease: "none",
        onUpdate: function() {
            planetObj.mesh.position.x = Math.cos(planetObj.angle) * planetObj.data.distance;
            planetObj.mesh.position.z = Math.sin(planetObj.angle) * planetObj.data.distance;
        }
    });
    
    planetObj.timeline = timeline;
}

function setupUI() {
    const ui = document.createElement('div');
    ui.className = 'ui';
    ui.innerHTML = `
        <h1>Solar System</h1>
        <div class="controls">
            <div class="control-group">
                <label>Speed:</label>
                <input type="range" id="speedSlider" min="0.1" max="5" step="0.1" value="1">
            </div>
            <div class="control-group">
                <button id="playPauseBtn">Pause</button>
                <button id="resetView">Reset View</button>
            </div>
        </div>
    `;
    document.body.appendChild(ui);
    
    document.getElementById('speedSlider').addEventListener('input', (e) => {
        animationSpeed = parseFloat(e.target.value);
        updateAnimationSpeed();
    });
    
    document.getElementById('playPauseBtn').addEventListener('click', togglePlayPause);
    document.getElementById('resetView').addEventListener('click', resetView);
    
    const planetInfo = document.createElement('div');
    planetInfo.className = 'planet-info';
    planetInfo.id = 'planetInfo';
    document.body.appendChild(planetInfo);
    
    planets.forEach(planetObj => {
        planetObj.mesh.userData.clickable = true;
    });
    
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    renderer.domElement.addEventListener('click', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(planets.map(p => p.mesh));
        
        if (intersects.length > 0) {
            showPlanetInfo(intersects[0].object.userData);
        } else {
            hidePlanetInfo();
        }
    });
}

function updateAnimationSpeed() {
    planets.forEach(planetObj => {
        if (planetObj.timeline) {
            planetObj.timeline.timeScale(isPaused ? 0 : animationSpeed);
        }
    });
}

function togglePlayPause() {
    isPaused = !isPaused;
    const button = document.getElementById('playPauseBtn');
    button.textContent = isPaused ? 'Play' : 'Pause';
    
    planets.forEach(planetObj => {
        if (planetObj.timeline) {
            if (isPaused) {
                planetObj.timeline.pause();
            } else {
                planetObj.timeline.play();
            }
        }
    });
    
    if (isPaused) {
        gsap.globalTimeline.pause();
    } else {
        gsap.globalTimeline.play();
    }
}

function resetView() {
    gsap.to(camera.position, {
        x: 0,
        y: 50,
        z: 100,
        duration: 2,
        ease: "power2.out"
    });
    controls.reset();
}

function showPlanetInfo(planetData) {
    const planetInfo = document.getElementById('planetInfo');
    planetInfo.innerHTML = `
        <h3>${planetData.name}</h3>
        <p><strong>Radius:</strong> ${planetData.radius} units</p>
        <p><strong>Distance:</strong> ${planetData.distance} units</p>
        <p><strong>Speed:</strong> ${planetData.speed.toFixed(3)} units</p>
        <p>${planetData.info}</p>
    `;
    planetInfo.style.display = 'block';
}

function hidePlanetInfo() {
    document.getElementById('planetInfo').style.display = 'none';
}

function animate() {
    requestAnimationFrame(animate);
    
    controls.update();
    
    if (sun && !isPaused) {
        sun.rotation.y += 0.005;
    }
    
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

init();
