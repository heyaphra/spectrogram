import React, { Component } from 'react';
import { Uploader, Downloader, PlaybackCtrl } from '../';
import { List, Button, Tooltip } from 'antd';

export const FileList = (props) => {
    const { onUploadSuccess, handleSelect, handlePlayback, isPlaying, selectedFile, dataSource } = props;
    return (
        <List
            header={
                <div style={{ width: '95vw', margin: '0 auto' }}>

                    <Uploader onUploadSuccess={onUploadSuccess} />

                    <Downloader style={{ marginLeft: '1vw' }} />
                    <PlaybackCtrl
                        handlePlayback={handlePlayback}
                        playing={isPlaying}
                        style={{ marginLeft: '1vw' }}
                    />
                    <span style={{ marginLeft: '1vw' }}>{selectedFile}</span>
                </div>
            }
            // footer={<div>Footer</div>}
            bordered
            dataSource={dataSource}
            renderItem={file => (
                <List.Item>
                    <Button onClick={() => handleSelect(file)}>
                        <List.Item.Meta
                            avatar={<img width={25} height={25} src="https://www.svgrepo.com/show/8210/musical-notes.svg" />}
                            title={file.name}
                        // description="File extension"
                        />
                    </Button>

                </List.Item>
            )}
        />
    )
}