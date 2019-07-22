import React from 'react';
import { Uploader, Downloader, PlaybackCtrl, Recorder } from '../';
import { List, Button, Icon } from 'antd';
export const FileList = (props) => {
    const {
        onUploadSuccess,
        handleSelect,
        handlePlayback,
        handleCapture,
        isPlaying,
        selectedFile,
        dataSource,
        mic,
        handleDownload
    } = props;
    return (
        <List
            style={props.style}
            header={
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-evenly', }}>
                        <Uploader onUploadSuccess={onUploadSuccess} />
                        <Downloader handleDownload={handleDownload} />
                        <PlaybackCtrl
                            disabled={!selectedFile || mic}
                            handlePlayback={handlePlayback}
                            isPlaying={isPlaying}
                        />
                        <Recorder mic={mic} isPlaying={isPlaying} handleCapture={handleCapture} />
                        {selectedFile ? <span style={{ textAlign: 'center' }}><Icon type='sound' /> {mic ? 'Microphone' : selectedFile.name}</span> : null}
                    </div>
                </div>
            }
            bordered
            dataSource={dataSource}
            renderItem={file => (
                <List.Item>
                    <Button
                        disabled={mic}
                        block
                        // style={{ margin: '0 auto' }}
                        onClick={() => handleSelect(file)}>
                        <List.Item.Meta
                            avatar={<img width={25} height={25} src="https://www.svgrepo.com/show/8210/musical-notes.svg" />}
                            title={
                                <span>
                                    {
                                        file.source ?
                                            <span>
                                                <a href={file.source} target='_blank'>{file.name}</a> by {file.author.name}
                                            </span>
                                            : file.name
                                    }
                                </span>
                            }
                        />
                    </Button>
                </List.Item>
            )}
        />
    )
}