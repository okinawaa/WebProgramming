import { Grid, makeStyles } from '@material-ui/core';
import { useField } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { FileError, FileRejection, useDropzone } from 'react-dropzone';
import { SingleFileUploadWithProgress } from './SingleFileUploadWithProgress';
import { UploadError } from './UploadError';

let currentId = 0;

function getNewId() {
    // we could use a fancier solution instead of a sequential ID :)
    return ++currentId;
}


const useStyles = makeStyles((theme) => ({
    dropzone: {
        border: `2px dashed ${theme.palette.primary.main}`,
        borderRadius: theme.shape.borderRadius,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.palette.background.default,
        height: theme.spacing(10),
        outline: 'none',
    },
}));

export function MultipleFileUploadField({ name }) {
    const [_, __, helpers] = useField(name);
    const classes = useStyles();

    const [files, setFiles] = useState([]);
    const onDrop = useCallback((accFiles, rejFiles) => {
        const mappedAcc = accFiles.map((file) => ({ file, errors: [], id: getNewId() }));
        const mappedRej = rejFiles.map((r) => ({ ...r, id: getNewId() }));
        setFiles((curr) => [...curr, ...mappedAcc, ...mappedRej]);
    }, []);

    useEffect(() => {
        helpers.setValue(files);
        // helpers.setTouched(true);
    }, [files]);

    function onUpload(file, url) {
        setFiles((curr) =>
            curr.map((fw) => {
                if (fw.file === file) {
                    return { ...fw, url };
                }
                return fw;
            })
        );
    }

    function onDelete(file) {
        setFiles((curr) => curr.filter((fw) => fw.file !== file));
    }

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: ['image/*', 'video/*', '.pdf' , '.doc','.docx' , 'xlsx'],
        maxSize: 30000 * 1024, // 3000KB
    });

    return (
        <React.Fragment>
            <Grid item>
                <div {...getRootProps({ className: classes.dropzone })}>
                    <input {...getInputProps()} />

                    <p>여기로 파일을 드래그해주세요</p>
                </div>
            </Grid>

            {files.map((fileWrapper) => (
                <Grid item key={fileWrapper.id}>
                    {fileWrapper.errors.length ? (
                        <UploadError
                            file={fileWrapper.file}
                            errors={fileWrapper.errors}
                            onDelete={onDelete}
                        />
                    ) : (
                        <SingleFileUploadWithProgress
                            onDelete={onDelete}
                            onUpload={onUpload}
                            file={fileWrapper.file}
                        />
                    )}
                </Grid>
            ))}
        </React.Fragment>
    );
}