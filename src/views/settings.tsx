import { IconArrowBack, IconArrowBarToLeft, IconArrowLeft } from '@tabler/icons-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../routes/routes'
import { Paper, Tabs, Text, Title } from '@mantine/core'
import CommodityManagement from './commodityManage'

export default function Settings() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Currency')
const [tab, setTab] = useState<string | null>('Currency')

  const settings = [
  // {title: 'Commodity Management'},
  // {title: 'Method Of Payment'},
  {title: 'Currency'},
  {title: 'Pinpad Settings'},

]

// const renderComponent = () => {
//   switch (activeTab) {
//     case 'Commodity Management':
//       return <CommodityManagement />
//     case 'Method Of Payment':
//       return <p>Payment method</p>
//     case 'Exchange Rate':
//       return <p>Exchange Rate</p>
//     case 'Pinpad Settings':
//       return <p>Pinpad Settings</p>
//     default:
//       return <p>tab</p>
//   }
// }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
      <div style={{ backgroundColor: '#d2d2d2', height: '100dvh', width: '20%', padding: 40}}>
        <IconArrowLeft onClick={()=> navigate(ROUTES.home)} style={{ cursor: 'pointer'}} />
        <Title order={3} mb={40} mt={20}>Settings</Title>
        {/* <div style={{ marginTop: 20}}>
            {settings.map((title)=> {
              return (
                <Paper bg={title.title === activeTab ? '#008000' : ''} c={title.title === activeTab ? '#fff' : ''} onClick={()=> setActiveTab(title.title)} style={{cursor: 'pointer'}} m={10} p={10}>{title.title}</Paper>
              )
            })}

        </div> */}
        </div>
      <div style={{ height: '100dvh', width: '80%', padding: 40}}>
      <Tabs value={tab} onChange={setTab}>
      <Tabs.List>
        <Tabs.Tab fw={'bold'} value="Currency">Currency</Tabs.Tab>
        <Tabs.Tab fw={'bold'}  value="Pinpad">Pinpad Settings</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="Currency" mt={40} p={20}>First panel</Tabs.Panel>
      <Tabs.Panel value="Pinpad" p={20} mt={40}>Second panel</Tabs.Panel>
    </Tabs>
       
        </div>

    </div>
  )
}
