    var scene, camera
    var renderer
    var height, width


    var config = {
        isMobile: false,
        background: 0x282828
    }


     var frontMainCoords = [
            [-80, -30],
            [-80, 20],
            [50, 20],
            [50, -30],
            [-80, -30]
        ]


    width = window.innerWidth
    height = window.innerHeight

    scene = new THREE.Scene()

    // 
    scene.background = new THREE.Color(0xffffff);

    camera = new THREE.PerspectiveCamera(45, width / height, 1, 5000)
    camera.position.set(330, 330, 330)
    camera.lookAt(scene.position)

    renderer = new THREE.WebGLRenderer({
        antialias: true
    })
    renderer.setSize(width, height)
    renderer.setClearColor(config.background)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    document.body.appendChild(renderer.domElement)

    checkUserAgent()

    buildAuxSystem()
    buildLightSystem()

    buildbuilding()




    loop()
    onWindowResize()

    function checkUserAgent() {
        var n = navigator.userAgent;
        if (n.match(/Android/i) || n.match(/webOS/i) || n.match(/iPhone/i) || n.match(/iPad/i) || n.match(/iPod/i) || n.match(/BlackBerry/i)) {
            config.isMobile = true
            camera.position.set(420, 420, 420)
            renderer.shadowMap.enabled = false
        }
    }

    function addBuliding() {
        var build = createBuliding()
        build.position.z = -10
        scene.add(build)
    }


    function buildbuilding() {

        var planeGeometry = new THREE.BoxBufferGeometry(320, 0, 320)

        var plane = utils.makeMesh('lambert', planeGeometry, "white")

        plane.position.y = -3
        addBuliding()
        scene.add(plane)
    }


    function createBuliding() {


        var building = new THREE.Object3D()
        var base=createBase("G23号楼")
        building.add(base)
        var floor_height=40
        var Floor_num=7   // 7层楼
        
        floor_person_number=[12,44,11,22,90,10,9]



        for (var i = 1; i <= Floor_num; i++) {
            var frontMain_floor = createFloor(i,floor_height,floor_person_number[i -1])
            frontMain_floor.position.y=i*floor_height+0.5;
            building.add(frontMain_floor)
        }
        var floortop = createTop(Floor_num,floor_height)
        building.add(floortop)
        return building
    }

    
    //楼底座
    function createBase(label) {
        var baseGeometry = new THREE.BoxBufferGeometry(180, 3, 140)
        var base = utils.makeMesh('lambert', baseGeometry, 0xffffff)
        


        // 放置text
        var x = document.createElement("canvas");
        var xc = x.getContext("2d");
        x.width = x.height = 128;
        xc.shadowColor = "white";
        xc.shadowBlur = 7;
        xc.fillStyle = "orange";
        xc.font = "10pt arial bold";
        xc.fillText(label, 10, 64);

        var xm = new THREE.MeshBasicMaterial({
            map: new THREE.Texture(x),
            transparent: true
        });
        xm.map.needsUpdate = true;

        var mesh = new THREE.Mesh(new THREE.CubeGeometry(150, 1, 150), xm);
        mesh.position.x = 25;
        mesh.position.y = 3;
        mesh.position.z = 50;
        mesh.doubleSided = true;
        base.add(mesh);

        return base

    }


    function createTop(Floor_num,floor_heigh) {
 
        
        var frontMainShape = utils.makeShape(frontMainCoords)

        var frontTopShape = frontMainShape
        var frontTopGeometry = utils.makeExtrudeGeometry(frontTopShape, 3)
        var frontTop = utils.makeMesh('lambert', frontTopGeometry, 0x11c1ad)
        frontTop.position.y = Floor_num*floor_heigh +40
        return frontTop


    }

    function createFloor(index,floor_heigh,person_number) {

        var Floor = new THREE.Object3D()
        
        var frontMainShape = utils.makeShape(frontMainCoords)
        var frontMainGeometry = utils.makeExtrudeGeometry(frontMainShape, floor_heigh)
        var frontMainMaterial = new THREE.MeshPhongMaterial({
            map: textures.window()
        })
        frontMainMaterial.map.repeat.set(0.09, 0.009)
        var frontMain = new THREE.Mesh(frontMainGeometry, frontMainMaterial)


        // 增加轮廓线条
        var outlineMaterial1 = new THREE.MeshBasicMaterial({
            color: "white",
            wireframe: true
        });
        var outlineMaterial2 = new THREE.MeshLambertMaterial({
            color: 0xE0E5EC,
            opacity: 0.7,
            transparent: true,
            overdraw: 1.1
        })
        var outlineMesh1 = new THREE.Mesh(frontMainGeometry, outlineMaterial2);

        frontMain.add(outlineMesh1);
        frontMain.castShadow = true
        frontMain.receiveShadow = true
        Floor.add(frontMain)



        // 放置text

        var x = document.createElement("canvas");
        var xc = x.getContext("2d");
        x.width = x.height = 128;
        xc.shadowColor = "white";
        xc.shadowBlur = 7;
        xc.fillStyle = "blue";
        xc.font = "9pt arial bold";
        xc.fillText( index +'层:'+person_number+'人', 10, 64);

        var xm = new THREE.MeshBasicMaterial({
            map: new THREE.Texture(x),
            transparent: true
        });

        xm.map.needsUpdate = true;

        var mesh = new THREE.Mesh(new THREE.CubeGeometry(150, 1, 150), xm);
        mesh.position.x = 125;
        mesh.position.y = floor_heigh - 10;
        mesh.position.z = 50;
        mesh.doubleSided = true;
        Floor.add(mesh);
        return Floor
    }

    function buildLightSystem() {

        if (!config.isMobile) {
            var directionalLight = new THREE.DirectionalLight(0xffffff, 1.1);
            directionalLight.position.set(300, 1000, 500);
            directionalLight.target.position.set(0, 0, 0);
            directionalLight.castShadow = true;

            var d = 300;
            directionalLight.shadow.camera = new THREE.OrthographicCamera(-d, d, d, -d, 500, 1600);
            directionalLight.shadow.bias = 0.0001;
            directionalLight.shadow.mapSize.width = directionalLight.shadow.mapSize.height = 1024;
            scene.add(directionalLight)

            var light = new THREE.AmbientLight(0xffffff, 0.3)
            scene.add(light)
        } else {
            var hemisphereLight = new THREE.HemisphereLight(0xffffff, 1)
            scene.add(hemisphereLight)

            var light = new THREE.AmbientLight(0xffffff, 0.15)
            scene.add(light)
        }

    }

    function buildAuxSystem() {


        var gridHelper = new THREE.GridHelper(320, 64)
        scene.add(gridHelper)

        var controls = new THREE.OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true
        controls.dampingFactor = 0.25
        controls.rotateSpeed = 0.35
    }

    function loop() {


        renderer.render(scene, camera)
        requestAnimationFrame(loop)
    }

    function onWindowResize() {
        window.addEventListener('resize', function() {
            width = window.innerWidth
            height = window.innerHeight

            camera.aspect = width / height;
            camera.updateProjectionMatrix()

            renderer.setSize(width, height)
        })
    }