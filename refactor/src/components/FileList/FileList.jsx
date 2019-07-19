import React from 'react';
import { Uploader, Downloader, PlaybackCtrl } from '../';
import { List, Button, Icon } from 'antd';

export const FileList = (props) => {
    const {
        onUploadSuccess,
        handleSelect,
        handlePlayback,
        isPlaying,
        selectedFile,
        dataSource
    } = props;
    return (
        <List
            style={props.style}
            header={
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <Uploader onUploadSuccess={onUploadSuccess} />
                        <PlaybackCtrl
                            disabled={!selectedFile}
                            handlePlayback={handlePlayback}
                            isPlaying={isPlaying}
                        />
                        <Downloader />
                    </div>
                    {selectedFile ? <div style={{ textAlign: 'center', marginTop: '2%' }}><Icon type='sound' /> {selectedFile.name}</div> : null}
                </div>
            }
            bordered
            dataSource={dataSource}
            renderItem={file => (
                <List.Item>
                    <Button
                        block
                        style={{ margin: '0 auto' }}
                        onClick={() => handleSelect(file)}>
                        <List.Item.Meta
                            avatar={<img width={25} height={25} src="https://www.svgrepo.com/show/8210/musical-notes.svg" />}
                            title={file.name}
                        />
                    </Button>
                </List.Item>
            )}
        />
    )
}