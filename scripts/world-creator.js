/**
 * This Section of the code is the Core of 3D Rendering.
 * It contains the logic to streamline the rendering.
 */

let pre_rendering_queue = [];
let rendering_tasks = [];

function dequeue_rendering_queue() {
    rendering_tasks.forEach((task, i) => {
        task();
        delete rendering_tasks[i];
    });
    rendering_tasks = [];
}

function enqueue_rendering_queue() {
    pre_rendering_queue.forEach(task => {
        rendering_tasks.push(task);
    });
}

function add_to_pre_rendering_queue(action) {
    return pre_rendering_queue.push(action) - 1;
}

function remove_from_pre_rendering_queue(index) {
    pre_rendering_queue.splice(index, 1);
}

function start_rendering() {
    requestAnimationFrame(start_rendering);
    dequeue_rendering_queue();
    enqueue_rendering_queue();
    world.renderer.render(world.scene, world.camera);
}

/**
 * This Section of the code deals with the Content and Interaction with the 3D world.
 */

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

    add_to_pre_rendering_queue(() => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
    });

    start_rendering();
}

export const world_creator = {
    create_first_world: create_first_world
};
