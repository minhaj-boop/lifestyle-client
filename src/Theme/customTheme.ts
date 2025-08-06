import { createTheme } from "@mui/material";

const customTheme = createTheme({
    palette:{
        mode:'light',
        primary: {
            main: '#8F1402'
        },
        secondary:{
            main: '#BC4A3C'
        }
    },
    breakpoints: {
        values: {
          xs: 0,
          sm: 640,  // Tailwind sm
          md: 768,  // Tailwind md
          lg: 1024, // Tailwind lg
          xl: 1280  // Tailwind xl
        }
    }
})

export default customTheme;