document.addEventListener("DOMContentLoaded", function () {

    let battleship = document.getElementById(`battleship`);

    let scene = new THREE.Scene();
    // Creates a scene
    const aspect = window.innerWidth / window.innerHeight;
    console.log(aspect)  
    console.log(battleship.clientWidth, battleship.clientHeight)
    console.log(window.innerWidth, window.innerHeight)
    // Aspect Ratio of canvas 
    let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // (FOV, Aspect Ratio, Near, Far)
    // FOV determines how wide the image will look
    // Aspect Ratio is width / height
    // Near & Far determines how if object will be rendered

    let renderer = new THREE.WebGLRenderer({ canvas: battleship, antialias: true });
    // Enable anti-aliasing

    renderer.setSize(battleship.clientWidth, battleship.clientHeight);
    // This set the size of container

    renderer.shadowMap.enabled = true;
    // Enable shadows

    // Set background color
    scene.background = new THREE.Color(0x999999);

    let ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);
    // Adds ambient light

    let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(2, 1, 5);
    // Adds directional light

    directionalLight.castShadow = true;
    // Enable shadow casting
    scene.add(directionalLight);

    let loader = new THREE.GLTFLoader();
    // This will load the GLB file
    loader.load('Cruiser.glb', function (gltf) {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                // Creates shadow
            }
        });
        scene.add(gltf.scene);
        // This adds the GLB file to scene
    });

    directionalLight.shadow.bias = -0.001;
    // Adjust the bias value as needed

    // let vector = 0;
    // vector.x = (vector.x + 1) * width / 2;
    // vector.y = - (vector.y - 1) * height / 2;
    // vector.z = 0;
    // let vectorPostion = (vector.x, vector.y, vector.z)
    // camera.position.set(vectorPostion);
    camera.position.set(0, 2.487, -8.353);
    // Camera position
    camera.rotation.set(0, Math.PI, 0);
    // Camera rotation
    // camera.translateZ( distance );


    // const delta = targetRocketPosition * Math.sin(Math.PI * 2 * t);
    // if (rocket) {
    //   rocket.rotation.y += 0.1;
    //   rocket.position.y = delta;
    // }
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();


});
