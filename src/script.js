import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', (_event) => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    // updating the renderer, the canvas is updated
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio = Math.min(window.devicePixelRatio, 2)
})

window.addEventListener('dblclick', () => {
    const isFullScreen = document.fullscreenElement || document.webkitFullscreenElement
    if (!isFullScreen) {
        // go fullscreen
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen()
            return
        }
        canvas.webkitRequestFullScreen()
        return
    }
    // leave fullsceen
    if (document.exitFullscreen) {
        document.exitFullscreen()
        return
    }
    document.webkitExitFullscreen()
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas,
})
renderer.setPixelRatio = Math.min(window.devicePixelRatio, 2)
renderer.setSize(sizes.width, sizes.height)

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()