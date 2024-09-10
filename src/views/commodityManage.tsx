import { Title, Text, Switch } from '@mantine/core'
import React from 'react'

export default function CommodityManagement() {
  return (
    <div>
        <Title mb={50} order={2} style={{textAlign: 'center'}}> CommodityManagement</Title>

       <div>
       <small style={{color: 'red'}}>Select Item To Display</small>
       </div>

    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBlock: 30, borderBottom: '2px solid #dedede', width: '100%'}}>
        <div>
        <Title order={4}>Weighing Goods</Title>
        <small>Fruit and vegetables</small>
        </div>

        <div>
            <Switch size='md' color='green' />
        </div>

    </div>



    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBlock: 30, borderBottom: '2px solid #dedede', width: '100%'}}>
        <div>
        <Title order={4}>Unweighing Goods</Title>
        <small>Drinks and Snacks</small>
        </div>

        <div>
            <Switch size='md' color='green' />
        </div>

    </div>
    
       
        </div>
  )
}
