const solucionBTN = document.querySelector('#solucion');
solucionBTN.addEventListener('click', mostrarSolucion);

//En este arreglo se guardan los alumnos con sus respectivas notas, promedio y si aprobó
const listadoAlumnos = [];

function mostrarSolucion() {
  do {
    cargarNotas();
    console.log(listadoAlumnos);
  } while (confirm('Desea agregar otro alumno'));

  resultadosFinales(listadoAlumnos);
}

function cargarNotas() {
  let nombre = '';
  const notas = [];

  //Pedimos el nombre del alumno
  while (nombre === '') {
    nombre = prompt('Ingrese el nombre del alumno');
  }

  //Agregamos 5 notas (con validación)
  do {
    const nota = Number(prompt(`Nota del examen n° ${notas.length + 1}`));

    if (nota <= 0 || isNaN(nota) || nota > 10 || !nota) {
      alert('La nota debe ser entre 1 y 10');
    } else {
      notas.push(nota);
    }
  } while (notas.length < 5);

  //Destructuring de Array
  //La funcion calcularAlumnoAprobado retorna un array
  const [aprobado, promedio] = calcularAlumnoAprobado(notas);

  //Object Literal Enhancement
  const alumno = {
    nombre,
    notas,
    promedio,
    aprobado,
  };

  //Mandamos el objeto de alumno a la funcion para mostrar info
  //Si aprobó/desaprobó y con que promedio lo hizo
  alert(mostrarInfo(alumno));

  //Agregamos el alumno al listado de alumnos
  listadoAlumnos.push(alumno);
}

function calcularAlumnoAprobado(notas) {
  const cantidadExamenes = notas.length;

  //Se utiliza reduce para sumar todos los elementos del array
  const sumaNotas = notas.reduce((prev, act) => prev + act, 0);

  //Se considera aprobado con un promedio de 6 o más.
  const promedio = sumaNotas / cantidadExamenes;

  //Se retorna true/false y el promedio
  return [promedio >= 6, promedio];
}

function mostrarInfo(alumno) {
  //Destructuring del objeto alumno
  const { nombre, aprobado, promedio } = alumno;

  return aprobado
    ? `El alumno ${nombre} ha aprobado con un promedio de ${promedio}`
    : `El alumno ${nombre} ha desaprobado con un promedio de ${promedio}`;
}

function resultadosFinales(listadoAlumnos) {
  const cantidadAlumnos = listadoAlumnos.length;

  //Podriamos mostrar el listado de alumnos aprobados/desaprobados
  //En este caso solo lo usamos para contarlos
  const alumnosAprobados = listadoAlumnos.filter(
    (alumno) => alumno.aprobado === true
  );
  const alumnosDesaprobados = listadoAlumnos.filter(
    (alumno) => alumno.aprobado !== true
  );
  
  //Ordenar el listado de alumnos de mejor a peor promedio
  const mejoresPromedios = [...listadoAlumnos].sort((a, b) => {
    if (a.promedio > b.promedio) {
      return -1;
    }
    if (a.promedio < b.promedio) {
      return 1;
    }
    return 0;
  });

  console.log(mejoresPromedios, listadoAlumnos)


  alert(`Han aprobado ${alumnosAprobados.length} alumnos de un total de ${cantidadAlumnos}
  Han desaprobado ${alumnosDesaprobados.length} alumnos de un total de ${cantidadAlumnos}`);
  alert(`El alumno con mejor promedio fué ${mejoresPromedios[0].nombre}`)
}
