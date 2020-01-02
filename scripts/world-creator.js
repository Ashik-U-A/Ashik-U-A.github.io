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

/**
 * The Sky Object
 */

let Sky = (() => {
    let instance = null;

    function init() {
        let sky = new THREE.Mesh(
            new THREE.SphereGeometry(1),
            new THREE.ShaderMaterial({
                fragmentShader: document.getElementById("sky-shader--fragment")
                    .textContent
            })
        );
        return sky;
    }

    return {
        get_instance: () => {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };
})();

/**
 * The Terrain Object
 */

let Terrain = (() => {
    let instance = null;

    function init() {
        return new THREE.Mesh(
            new THREE.PlaneBufferGeometry(),
            new THREE.MeshBasicMaterial({
                color: 0xffff00,
                side: THREE.DoubleSide
            })
        );
    }

    return {
        get_instance: () => {
            if (!instance) {
                instance = init();
                instance.setRotationFromEuler(
                    new THREE.Euler(-90 * (Math.PI / 180), 0, 0)
                );
            }
            return instance;
        }
    };
})();

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

    world.camera.position.z = 5;
    world.camera.position.y = 2;
    world.camera.lookAt(0, 0, 0);

    world.scene.add(Terrain.get_instance());
    world.scene.add(Sky.get_instance());

    start_rendering();
}

export const world_creator = {
    create_first_world: create_first_world
};
