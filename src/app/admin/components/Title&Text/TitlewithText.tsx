import {  Box,Typography} from '@mui/material';
import React from 'react'
function TitlewithText() {
  return (
    <Box marginTop={2}>
         <Typography variant='h5'>Title with text</Typography>
      <Box padding={2}>
        <Typography variant='h4'>Title</Typography>
        <Typography > Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam ex excepturi autem maiores debitis voluptates ratione, laboriosam quos culpa in cumque? 
            Rerum assumenda reiciendis dolorum recusandae sunt blanditiis illo maiores!</Typography>
      </Box>
    </Box>
  )
}
export default TitlewithText
