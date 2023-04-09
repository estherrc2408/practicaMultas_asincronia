document.addEventListener('DOMContentLoaded', () => {

    //querySelectors
    const table = document.querySelector('#dataTable tbody tr');
    const forms = document.querySelector('#formulary');
    let matricule = document.querySelector('#matri');
    const errorList = document.querySelector('#errorList');
    //VARIABLES
    let name;
    let dataProp = [];
    const arrayCars = [
        { id: 1, matricula: '2385HYN', estado: 'alta' },
        { id: 2, matricula: '1403MAR', estado: 'baja' },
        { id: 3, matricula: '0921TER', estado: 'alta' },
        { id: 4, matricula: '7458HEL', estado: 'alta' },
        { id: 5, matricula: '1331PUF', estado: 'alta' },
        { id: 6, matricula: '7654SAD', estado: 'alta' },
        { id: 7, matricula: '9713FIN', estado: 'alta' },
        { id: 8, matricula: '5478IMO', estado: 'baja' }
    ];

    const arrayProps = [
        { id: 1, modelo: 'Kia', direccion: 'Calle San Ambrosio 12', telefono: '666666666', nombre: 'Alvaro' },
        { id: 3, modelo: 'Ford', direccion: 'Calle San Astio 12', telefono: '666666666', nombre: 'Jose' },
        { id: 4, modelo: 'Hyundai', direccion: 'Calle San Bolsillo 12', telefono: '666666666', nombre: 'Juan' },
        { id: 5, modelo: 'Volkswagen', direccion: 'Calle San Amigo 12', telefono: '666666666', nombre: 'Ana' },
        //el seis esta dado de alta pero no tenemos datos del conductor
        { id: 7, modelo: 'Audi', direccion: 'Calle San Antonio 12', telefono: '666666666', nombre: 'Alfredo' }
    ]

    const arrayMultas = [
        { id: 5, multas: 2 },
        { id: 4, multas: 5 },
        { id: 7, multas: 10 },
    ]
    // //id por teclado
    // let id = 3;

    //EVENT
    forms.addEventListener('submit', (e) => {
        let mat = matricule.value; //toma el valor introducido en el input de text
        e.preventDefault(); //para que la pagina no redireccione a una nueva
        const car = arrayCars.find((car) => car.matricula == mat);
        // let id = car.id;
        // console.log(id);
        validate(car,mat);

    })

    //FUNCTIONS
    const validate = (car,mat) => {
        console.log(car);
        console.log(mat);
        if (car==undefined) {
            throw (drawErrors(`La matrícula ${mat} no está en la base de datos`));
        } else {
            let id = car.id;
            console.log(id);
            getData(id);
        }
    }


    const getCar = async (id) => {
        const car = arrayCars.find((item) => item.id == id);
        if (!car) {
            throw (
                // errors=`La matrícula ${matricule} e ${id} no esta en nuestra base de datos`
                drawErrors(`La matrícula ${matricule} e ${id} no esta en nuestra base de datos`)
            );
        } else {
            console.log(car);//obj con matricula=input.value;
            // table.innerHTML='';
            // table.innerHTML=`<td>${car.matricula}</td>`
            return car;
        }
    }

    const getProp = async (id, matricula, estado) => {
        const prop = arrayProps.find((item) => item.id == id);
        console.log(prop);
        if (!prop) {
            throw (
                drawErrors(`El propietario con coche de matrícula ${matricula} está dado de ${estado}, no tenemos sus datos`)
                )
        } else {
            console.log(prop);
            return prop;
        }
    }

    const getMult = async (id, matricula, nombre) => {
        const multObj = arrayMultas.find((item) => item.id === id);
        console.log(multObj);
        if (!multObj) {
            throw (
                drawErrors(`El propietario ${nombre} del coche de matrícula ${matricula} no tiene multas registradas`)
            );
        } else {
            return multObj;
        }
    }

    const getData = async (id) => {
        try {
            //obteniendo del arrayCars
            const { matricula } = await getCar(id);
            const { estado  } = await getCar(id);
            //obteniendo de arrayProps
            const { nombre, modelo } = await getProp(id, matricula, estado);
            const { multas } = await getMult(id , matricula , nombre);
            console.log(matricula, modelo, nombre, multas);
            console.log(matricula && modelo && nombre && multas);

            if(matricula && modelo && nombre && multas){
                table.innerHTML='';
                table.innerHTML=`<td>${matricula}</td><td>${modelo}</td><td>${nombre}</td><td>${multas}</td>`
            }else{
                table.innerHTML='';
            }
        } catch (error) {
            console.log(error);
        }

    }
    // getData(id);
    //DRAW
    const drawErrors = (error) => {
        errorList.innerHTML += `<li>${error}</li>`

    }

    const drawTable = (campos) =>{
        table.innerHTML=``
    }

})