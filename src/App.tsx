import Container from "@mui/material/Container"
import DataGridDemo from "./table"
import Rating from "@mui/material/Rating"
import Header from "./components/Header"
import Typography from "@mui/material/Typography"


const App = () => {
  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ paddingY: 4 }}>
        <Typography variant="h4" sx={{ marginBottom:2 }}>Projektaufträge</Typography>
        <DataGridDemo />
        <Rating name="read-only" value={4} readOnly />
      </Container>
    </>
  )
}

export default App
