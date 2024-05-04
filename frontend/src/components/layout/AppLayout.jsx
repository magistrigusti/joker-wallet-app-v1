import { createContext } from 'react';
import { Layout, Spin } from "antd";
import AppHeader from "./AppHeader";
import AppSider from "./AppSider";
import AppContent from "./AppContent";
import CryptoContext from '../../context/crypto-context';

const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  width: 'calc(50% - 8px)',
  maxWidth: 'calc(50% - 8px)',
};

export default function AppLayout() {
  const { loading } = createContext(CryptoContext);

  if (loading) {
    return <Spin fullscreen />
  }

  return (
    <Layout>
      <AppHeader />

      <Layout>
        <AppSider />

        <AppContent/>
      </Layout>
    </Layout>
  )
}