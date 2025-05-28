import { IconArrowBack, IconArrowBarToLeft, IconArrowLeft } from '@tabler/icons-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../routes/routes'
import { Button, Paper, Switch, Tabs, Text, TextInput, Title } from '@mantine/core'

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

      <Tabs.Panel value="Currency" mt={40} p={20}>
        <div style={{ display: 'flex', justifyContent: 'center'}}>
          <Title order={3}>Currency Configuration</Title>
        </div>
        </Tabs.Panel>
      <Tabs.Panel value="Pinpad" p={20} mt={40}>
      <div style={{ display: 'flex', justifyContent: 'center'}}>
          <Title order={3}>Pinpad Configuration</Title>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 30, alignItems: 'center'}}>
          <Text mr={20} fw={'bold'}>Debug Mode</Text><Switch color='#008000' size='lg' />
          </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 30, alignItems: 'center'}}>
        <TextInput label='Input pinpad IP address' placeholder='000.000.0.0.00' m={20}/> <Button m={20} color='red'>Cancel</Button>   <Button color="#008000" m={20}>Save</Button>
          </div>
        
       
        </Tabs.Panel>
    </Tabs>
       
        </div>

    </div>
  )
}
