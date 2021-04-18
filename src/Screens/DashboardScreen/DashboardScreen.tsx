import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { checkToken } from '../../Actions/AuthActions'
import { Button, Input, Tabs, Upload } from 'antd'
import { CameraFilled } from '@ant-design/icons'
import { RcFile } from 'antd/lib/upload';
import { uploadImage } from '../../Actions/PhotographActions';
import { uploadItem } from '../../Actions/PortfolioActions';

const { TabPane } = Tabs
const { Dragger } = Upload
const { TextArea } = Input

export const DashboardScreen = () => {

  const [imageData, setImageData] = useState<string>()
  const [fileName, setFileName] = useState<string>()

  const [iso, setIso] = useState<string>()
  const [aperture, setAperture] = useState<string>()
  const [focalLength, setFocalLength] = useState<string>()
  const [shutterSpeed, setShutterSpeed] = useState<string>()
  const [location, setLocation] = useState<string>()
  const [time, setTime] = useState<string>()
  const [markdown, setMarkdown] = useState<string>()
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    checkToken()
  }, [])

  return (
    <DashboardScreenContainer>
      <Tabs>
        <TabPane tab="Photography" key="1">
          <EditorContainer>
            <Dragger
              style={{ padding: "10px 30px" }}
              name="file"
              customRequest={async (file) => {
                let fileToUpload = file.file as Blob
                let reader = new FileReader()
                reader.readAsDataURL(fileToUpload)
                reader.onload = () => {
                  var result = reader.result as string;
                  setImageData(result)
                  setFileName((file.file as RcFile).name)
                };
              }}
            >
              <p style={{ fontSize: 50 }}>
                <CameraFilled />
              </p>
              <p style={{ fontSize: 25 }}>
                {` ${fileName ?? "Upload a photo 😄"}`}
              </p>
            </Dragger>
            <TextFieldsContainer>
              <Input placeholder="ISO" onChange={(e) => { setIso(e.target.value) }}></Input>
              <Input placeholder="Aperture" onChange={(e) => { setAperture(e.target.value) }}></Input>
              <Input placeholder="Focal Length" onChange={(e) => { setFocalLength(e.target.value) }}></Input>
              <Input placeholder="Shutter Speed" onChange={(e) => { setShutterSpeed(e.target.value) }}></Input>
              <Input placeholder="Location" onChange={(e) => { setLocation(e.target.value) }}></Input>
              <Input placeholder="Time" onChange={(e) => { setTime(e.target.value) }}></Input>
              <Button danger={isError} onClick={async () => {
                if (imageData && iso && aperture && focalLength && shutterSpeed && location && time)
                  setIsError(await uploadImage(imageData, iso, aperture, focalLength, shutterSpeed, location, time))
                else
                  setIsError(true)
              }}>
                {"Submit"}
              </Button>
            </TextFieldsContainer>
          </EditorContainer>
        </TabPane>
        <TabPane tab="Portfolio" key="2">
          <EditorContainer>
            <Dragger
              style={{ padding: "10px 30px" }}
              name="file"
              customRequest={async (file) => {
                let fileToUpload = file.file as Blob
                let reader = new FileReader()
                reader.readAsDataURL(fileToUpload)
                reader.onload = () => {
                  var result = reader.result as string;
                  setImageData(result)
                  setFileName((file.file as RcFile).name)
                };
              }}
            >
              <p style={{ fontSize: 50 }}>
                <CameraFilled />
              </p>
              <p style={{ fontSize: 25 }}>
                {` ${fileName ?? "Upload a photo 😄"}`}
              </p>
            </Dragger>
            <TextFieldsContainer>
              <TextArea rows={10} placeholder="Markdown" onChange={(e) => { setMarkdown(e.target.value) }}></TextArea>
              <Button danger={isError} onClick={async () => {
                if (imageData && markdown)
                  setIsError(await uploadItem(imageData, markdown))
                else
                  setIsError(true)
              }}>
                {"Submit"}
              </Button>
            </TextFieldsContainer>
          </EditorContainer>
        </TabPane>
      </Tabs>
    </DashboardScreenContainer>
  );
}

const DashboardScreenContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 300px;
  flex-direction: column;
`

const EditorContainer = styled.div`
  width: 50vw;
  display: flex;
  justify-content: center;
  flex-direction: row;
  >* {
    margin: auto 20px;
  }
`

const TextFieldsContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  >* {
    margin: 5px auto;
  }
`