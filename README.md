# Sistema de sorteo simple

Se ha desarrollado desde el área de informática del STJ E.R. una pequeña aplicación capaz de ser ejecutada íntegramente con un navegador web.

La aplicación recibe como entrada un archivo csv con encabezados descriptivos y selecciona al azar una cantidad de registros configurable, sin reposición.

El algoritmo de aleatorio se basa en la función [Math.random()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random) disponible en el motor de javascript del navegador web empleado y cuya semilla aleatoria no puede ser seleccionada ni reiniciada por el usuario.

El código de la aplicación ha sido publicado en un repositorio público y el código fuente puede ser auditado desde https://github.com/stjerdev/sorteo-simple.

Así mismo la apliación puede ser ejecutada desde la sección de github pages accediendo a la siguiente url: https://stjerdev.github.io/sorteo-simple/

