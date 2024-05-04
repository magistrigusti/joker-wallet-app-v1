import { Layout, Select, Space, Button, Modal, Drawer } from 'antd'
import { useCrypto } from '../../context/crypto-context';
import { useEffect, useState } from 'react';
import CoinInfoModal from '../CoinInfoModal';
import AddAssetForm from '../AddAssetForm';

const headerStyle = {
  display: 'flex',
  width: '100%',
  height: 60,
  textAlign: 'center',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem',
}

export default function AppHeader() {
  const [select, setSelect] = useState(false);
  const [coin, setCoin] = useState(null);
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const { crypto } = useCrypto();

  useEffect(() => {
    const keypress = (event) => {
      if (event.key === '/') {
        setSelect((prev) => !prev);
      }
    }

    document.addEventListener('keypress', keypress);

    return () => document.removeEventListener('keypress', keypress);
  }, []);

  function handleSelect(value) {
    setCoin(crypto.find((c) => c.id === value));
    setModal(true);
  }

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{width: 250}}
        open={select}
        onSelect={handleSelect}
        onClick={() => setSelect((prev) => !prev)}
        value="press / to open"
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: 20 }}
              src={option.data.icon}
              atl={option.data.label}
            />{' '}
            {option.data.label}
          </Space>
        )}
      />

        <h1 style={{color: "white"}}>Joker Wallet</h1>

      <Button 
        type="primary" 
        onClick={() => setDrawer(true)}
      >
        Add asset
      </Button>

      <Modal 
        open={modal} 
        onCancel={() => setModal(false)}   
        footer={null}
      >
        <CoinInfoModal coin={coin} />
      </Modal>

      <Drawer 
        title="Add Asset" 
        width={600}
        onClose={() => setDrawer(false)} 
        open={drawer}
        destroyOnClose
      >
        <AddAssetForm onClose={() => setDrawer(false)} />
      </Drawer>
    </Layout.Header>
  );
}
