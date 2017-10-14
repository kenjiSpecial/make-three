const THREE = require('three');

export function makeCircleGeometry(params = {}){
    let rad = params.rad ? params.rad : 1;
    let dividedNum = params.dividedNum ? params.dividedNum : 20;

    let geometry = new THREE.BufferGeometry();
    let positions = [];

    let center = {x: 0, y: 0, z: 0};
    positions.push(center.x);
    positions.push(center.y);
    positions.push(center.z);

    let indexArray = [];

    for(let ii = 0;ii <  dividedNum; ii++){
        let theta = ii/dividedNum * 2 * Math.PI;
        let xx = rad * Math.cos(theta);
        let yy = rad * Math.sin(theta);
        let zz = 0;

        positions.push(xx); positions.push(yy); positions.push(zz);
    }

    for(let jj = 0; jj < dividedNum; jj++){
        indexArray.push(0);
        indexArray.push(1 + jj);
        indexArray.push(1 + (jj + 1) % dividedNum);
    }

    positions = new Float32Array(positions);
    indexArray = new Uint32Array(indexArray);

    geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setIndex(new THREE.BufferAttribute(indexArray, 1));

    return geometry;
}

export function makeLine(maxNum, gpuComputeSize){
    let uvs = [];
    let customUvs = [];
    let xx, yy;


    for(xx = 0; xx < maxNum; xx++){
        let uvX = xx / (maxNum - 1);
        // console.log(uvX);

        for(yy = 0; yy < 2; yy++){
            let uvY = yy ;

            uvs.push(uvX);
            uvs.push(uvY);
        }
    }


    let unit = 1/ gpuComputeSize;
    for(xx = 0; xx < maxNum; xx++){
        customUvs[4 * xx + 0] = parseInt(xx % gpuComputeSize) / gpuComputeSize + unit/2;
        customUvs[4 * xx + 1] = parseInt(xx / gpuComputeSize) / gpuComputeSize + unit/2;
        customUvs[4 * xx + 2] = customUvs[4 * xx + 0];
        customUvs[4 * xx + 3] = customUvs[4 * xx + 1];
    }

    let indexArray = [];
    for(let ii = 0; ii < (maxNum - 1); ii++){
        let num = ii * 2;
        indexArray.push(0 + num); indexArray.push(2 + num); indexArray.push(1 + num);
        indexArray.push(3 + num); indexArray.push(1 + num); indexArray.push(2 + num);
    }



    uvs = new Float32Array(uvs);
    customUvs = new Float32Array(customUvs);
    indexArray = new Uint32Array(indexArray);

    let geometry = new THREE.BufferGeometry();
    geometry.addAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    geometry.addAttribute('customUv', new THREE.BufferAttribute(customUvs, 2));
    geometry.setIndex(new THREE.BufferAttribute(indexArray, 1));

    return geometry;
}


export function makeRect(){
    let positions = [];

    let xx, yy;
    let xPos, yPos;

    for(yy = 0; yy < 2; yy++){
        yPos = 0.5 - yy;

        for(xx = 0; xx < 2; xx++){
            xPos = -0.5 + xx;
            positions.push(xPos); positions.push(yPos); positions.push(0);
        }
    }

    let indexArray = [];
    indexArray.push(0); indexArray.push(2); indexArray.push(1);
    indexArray.push(3); indexArray.push(1); indexArray.push(2);

    positions = new Float32Array(positions);
    indexArray = new Uint32Array(indexArray);

    let geometry = new THREE.BufferGeometry();
    geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setIndex(new THREE.BufferAttribute(indexArray, 1));

    return geometry;
}

export function makeUvRect(){
    let uvs = [];

    let xx, yy;
    let xPos, yPos;

    for(yy = 0; yy < 2; yy++){
        yPos = yy;
        for(xx = 0; xx < 2; xx++){
            xPos =xx;
            uvs.push(xPos);  uvs.push(yPos);
        }
    }

    let indexArray = [];
    indexArray.push(0); indexArray.push(2); indexArray.push(1);
    indexArray.push(3); indexArray.push(1); indexArray.push(2);

    uvs = new Float32Array(uvs);
    indexArray = new Uint32Array(indexArray);

    let geometry = new THREE.BufferGeometry();
    geometry.addAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    geometry.setIndex(new THREE.BufferAttribute(indexArray, 1));

    return geometry;
}

export function makeCircleLine(divideNum = 36){
    let uvs = [];
    let positions = [];

    for(let ii = 0; ii < divideNum; ii++){
        let theta = Math.PI * 2 / (divideNum ) * ii;

        positions.push(Math.cos(theta));
        positions.push(Math.sin(theta));
        positions.push(0);

        uvs.push(ii/(divideNum - 1));
        uvs.push(0);

        positions.push(Math.cos(theta));
        positions.push(Math.sin(theta));
        positions.push(0);

        uvs.push(ii/(divideNum - 1));
        uvs.push(1);

    }

    let indexArray = [];

    for(let ii = 0; ii < divideNum ; ii++){
        let num;
        if(ii === divideNum - 1){
            num = ii * 2;
            indexArray.push(0 + num); indexArray.push(0); indexArray.push(1 + num);
            indexArray.push(1); indexArray.push(1 + num); indexArray.push(0);
        }else{
            num = ii * 2;
            indexArray.push(0 + num); indexArray.push(2 + num); indexArray.push(1 + num);
            indexArray.push(3 + num); indexArray.push(1 + num); indexArray.push(2 + num);
        }

    }



    uvs = new Float32Array(uvs);
    positions = new Float32Array(positions);
    indexArray = new Uint32Array(indexArray);

    let geometry = new THREE.BufferGeometry();
    geometry.addAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setIndex(new THREE.BufferAttribute(indexArray, 1));

    return geometry;
}

export function makeOutlineGeometry(lineNum = 100){
    let positions = [];
    let indexArray = [];
    let customUvs = [];
    let thetas = [];
    let numberArray = [];
    let curNum = 0;

    for(curNum = 0; curNum < lineNum; curNum++){

        for(let ii = 0; ii < 6; ii++){
            let theta = Math.PI * 2 * ii / 6;

            positions.push(Math.cos(theta));
            positions.push(Math.sin(theta));
            positions.push(0);

            customUvs.push(ii / 6);
            customUvs.push(0);

            thetas.push(theta);

            numberArray.push(curNum);

            // ------------------------

            positions.push(Math.cos(theta));
            positions.push(Math.sin(theta));
            positions.push(0);

            customUvs.push(ii / 6);
            customUvs.push(1);

            thetas.push(theta);

            numberArray.push(curNum);
        }

        for(let jj = 0; jj < 6; jj++){
            let num = jj * 2;

            indexArray.push((num + 0) % 12 + curNum * 12);
            indexArray.push((num + 2) % 12 + curNum * 12);
            indexArray.push((num + 1) % 12 + curNum * 12);
            indexArray.push((num + 3) % 12 + curNum * 12);
            indexArray.push((num + 1) % 12 + curNum * 12);
            indexArray.push((num + 2) % 12 + curNum * 12);
        }

    }

    positions = new Float32Array(positions);
    thetas = new Float32Array(thetas);
    customUvs = new Float32Array(customUvs);
    numberArray = new Float32Array(numberArray);
    indexArray = new Uint32Array(indexArray);


    let geometry = new THREE.BufferGeometry();

    geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.addAttribute('customUv', new THREE.BufferAttribute(customUvs, 2));
    geometry.addAttribute('theta', new THREE.BufferAttribute(thetas, 1));
    geometry.addAttribute('number', new THREE.BufferAttribute(numberArray, 1));
    geometry.setIndex(new THREE.BufferAttribute(indexArray, 1));

    return geometry;
}



export function makeGPGPUGeometry(gpuComputeSize){
    let particleNum = gpuComputeSize * gpuComputeSize;

    let geometry = new THREE.BufferGeometry();
    let positions = new Float32Array( particleNum * 3 * 4);
    let indexArray = [];
    let uvs = new Float32Array(particleNum * 2 * 4);
    let sizes = new Float32Array(particleNum * 1 * 4);
    let customUvs = new Float32Array(particleNum * 2 * 4);

    var c = 0;
    for(var ii = 0; ii < particleNum; ii++){
        let xx = THREE.Math.randFloat(-500, 500);
        let yy = THREE.Math.randFloat(-500, 500);
        let zz = 0; //THREE.Math.randFloat(0, 1000);



        for(var jj = 0; jj < 4; jj++){
            var size = THREE.Math.randFloat(10, 150);

            positions[4 * 3 * ii +3 * jj] = xx;
            positions[4 * 3 * ii +3 * jj+ 1] = yy;
            positions[4 * 3 * ii +3 * jj+ 2] = zz;

            uvs[4 * 2 * ii + 2 * jj] = parseInt(jj /2);
            uvs[4 * 2 * ii + 2 * jj + 1] = jj % 2;

            sizes[4 * 1 * ii + 1 * jj] = size;

            customUvs[4 * 2 * ii + 2 * jj] = parseInt(ii % gpuComputeSize) / gpuComputeSize;
            customUvs[4 * 2 * ii + 2 * jj + 1] = parseInt(ii / gpuComputeSize) / gpuComputeSize;
        }

        indexArray[c++] = 4 * ii + 0;
        indexArray[c++] = 4 * ii + 1;
        indexArray[c++] = 4 * ii + 2;
        indexArray[c++] = 4 * ii + 2;
        indexArray[c++] = 4 * ii + 1;
        indexArray[c++] = 4 * ii + 3;
    }



    indexArray = new Uint32Array(indexArray);

    geometry.addAttribute('position', new THREE.BufferAttribute( positions, 3 ) );
    geometry.addAttribute('uv', new THREE.BufferAttribute( uvs, 2 ) );
    geometry.addAttribute('customUv', new THREE.BufferAttribute( customUvs, 2 ) );
    geometry.addAttribute('size', new THREE.BufferAttribute( sizes, 1 ) );

    geometry.setIndex(new THREE.BufferAttribute(indexArray, 1));


    return geometry;
}
