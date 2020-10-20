import { Button, Fade, Grid, Paper, TextField } from "@material-ui/core"
import React, { createRef, useState } from "react"
import { CSVReader } from "react-papaparse"
import Tabla from "./components/Tabla"

const App = () => {
  const [columnas, setColumnas] = useState<{ title: string; field: string }[]>([])
  const [data, setData] = useState<any[]>([])
  const [cantidadASortear, setCantidadASortear] = useState<number>(1)
  const [sorteoRealizado, setSorteoRealizado] = useState(false)
  const [seleccionados, setSeleccionados] = useState<any[]>([])
  const buttonRef = createRef<CSVReader>()

  const handleOpenDialog = (e: any) => {
    if (buttonRef.current) {
      buttonRef.current.open(e)
    }
  }

  const handleOnFileLoad = (data: any[]) => {
    setColumnas(Object.keys(data[0].data).map((c) => ({ title: c, field: c })))
    setData(data.map((d) => d.data))
  }

  const handleOnError = (err: Error) => {
    console.log(err)
  }

  const handleOnRemoveFile = () => {
    setSorteoRealizado(false)
    setSeleccionados([])
  }

  const sortear = () => {
    let dataRandom = data.map((d) => Object.assign({}, d, { rnd: Math.random() }))
    let ordenados = dataRandom.sort((a, b) => (a.rnd > b.rnd ? 1 : -1))
    let seleccionadosArr: any[] = []
    for (let i = 0; i < cantidadASortear; i++) {
      seleccionadosArr.push(ordenados[i])
    }
    setSorteoRealizado(true)
    setSeleccionados(seleccionadosArr)
  }

  const handleRemoveFile = () => {
    if (buttonRef.current) {
      setColumnas([])
      setData([])
      buttonRef.current.removeFile()
    }
  }
  return (
    <div style={{ maxWidth: "100%" }}>
      {!sorteoRealizado && (
        <>
          <CSVReader
            ref={buttonRef}
            onFileLoad={handleOnFileLoad}
            onError={handleOnError}
            noClick
            noDrag
            config={{
              header: true,
            }}
            onRemoveFile={handleOnRemoveFile}
          >
            {({ file }: any) => (
              <aside
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: 10,
                }}
              >
                <Button
                  type="button"
                  color="primary"
                  variant="contained"
                  onClick={handleOpenDialog}
                >
                  Seleccionar archivo
                </Button>
                <div
                  style={{
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: "#ccc",
                    height: 45,
                    lineHeight: 2.5,
                    marginTop: 5,
                    marginBottom: 5,
                    paddingLeft: 13,
                    paddingTop: 3,
                    width: "60%",
                  }}
                >
                  {file && file.name}
                </div>
                <Button variant="contained" color="secondary" onClick={handleRemoveFile}>
                  Quitar
                </Button>
              </aside>
            )}
          </CSVReader>
          <Tabla columns={columnas} data={data} title="Lista a sortear" />
          <Paper style={{ paddingLeft: "200px", margin: "20px" }}>
            <Grid container style={{ display: "flex", alignItems: "center" }}>
              <TextField
                id="cantidad-sorteo"
                label="cantidad"
                type="number"
                value={cantidadASortear}
                onChange={(e: any) => setCantidadASortear(+e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Button variant="contained" color="primary" size="small" onClick={sortear}>
                sortear
              </Button>
            </Grid>
          </Paper>
        </>
      )}
      {sorteoRealizado && (
        <Fade in={sorteoRealizado} style={{ transitionDelay: "500ms" }}>
          <Tabla
            columns={columnas}
            data={seleccionados}
            title="Seleccionados por Sorteo"
            options={{
              exportAllData: true,
              exportButton: true,
              paging: false,
            }}
          />
        </Fade>
      )}
    </div>
  )
}

export default App
