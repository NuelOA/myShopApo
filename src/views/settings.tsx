import { IconArrowBack, IconArrowBarToLeft, IconArrowLeft } from '@tabler/icons-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../routes/routes'
import { Paper, Text, Title } from '@mantine/core'
import CommodityManagement from './commodityManage'

export default function Settings() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Function Demonstration')

  const settings = [
  {title: 'Function Demonstration'},
  {title: 'Commodity Management'},
  {title: 'Method Of Payment'},
  {title: 'Exchange Rate'},
  {title: 'Pinpad Settings'},
  {title: 'Add Currency'}

]

const renderComponent = () => {
  switch (activeTab) {
    case 'Function Demonstration':
      return <p>Function Demonstration</p>
    case 'Commodity Management':
      return <CommodityManagement />
    case 'Method Of Payment':
      return <p>Payment method</p>
    case 'Exchange Rate':
      return <p>Exchange Rate</p>
    case 'Pinpad Settings':
      return <p>Pinpad Settings</p>
    default:
      return <p>tab</p>
  }
}

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
      <div style={{ backgroundColor: '#d2d2d2', height: '100dvh', width: '40%', padding: 40}}>
        <IconArrowLeft onClick={()=> navigate(ROUTES.home)} style={{ cursor: 'pointer'}} />
        <Title order={3} mb={40} mt={20}>Settings</Title>
        <div style={{ marginTop: 20}}>
            {settings.map((title)=> {
              return (
                <Paper bg={title.title === activeTab ? '#008000' : ''} c={title.title === activeTab ? '#fff' : ''} onClick={()=> setActiveTab(title.title)} style={{cursor: 'pointer'}} m={10} p={10}>{title.title}</Paper>
              )
            })}

        </div>
        </div>
      <div style={{ height: '100dvh', width: '60%', padding: 40}}>
        {renderComponent()}
        </div>

    </div>
  )
}
