import { UploadFile } from '@mui/icons-material';
import { FormControl, FormHelperText, Typography } from '@mui/material';
import {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { UseControllerProps, useController } from 'react-hook-form'

interface Props extends UseControllerProps {}

export function AppDropzone(props: Props) {
  const { fieldState, field } = useController({...props, defaultValue: ''});

  const dzStyles = {
    display: 'flex',
    border: '3px dashed #eeeeee',
    borderColor: '#eeeeee',
    borderRadius: '5px',
    paddingTop: '30px',
    alignItems: 'center',
    height: '200px',
    width: '500px',
  }

  const dzActive = {
    borderColor: '#2187f3'
  }

  const onDrop = useCallback((acceptedFiles: any) => {
    acceptedFiles[0] = Object.assign(acceptedFiles[0], {
      preview: URL.createObjectURL(acceptedFiles[0])
    });

    field.onChange(acceptedFiles[0]);
  }, [field]);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <FormControl style={isDragActive ? {...dzStyles, ...dzActive} : dzStyles}>
        <input {...getInputProps()} />
        <UploadFile sx={{ fontSize: '92px' }} />
        <Typography variant='h4'>Drop Image</Typography>
        <FormHelperText>{fieldState.error?.message}</FormHelperText>
      </FormControl>
    </div>
  )
}