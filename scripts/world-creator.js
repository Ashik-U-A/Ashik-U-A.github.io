const world = {
    camera: null,
    scene: null,
    renderer: null
};

function create_first_world() {
    console.log("Creating the 3D World");
    world.scene = new THREE.Scene();
    world.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    world.renderer = new THREE.WebGLRenderer();
    world.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body
        .querySelector(".world")
        .appendChild(world.renderer.domElement);

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);
    world.scene.add(cube);

    world.camera.position.z = 5;
    world.renderer.render(world.scene, world.camera);
}

export const world_creator = {
    create_first_world: create_first_world
};
