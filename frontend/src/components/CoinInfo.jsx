import { Flex, Typography} from 'antd';

export default function CoinInfo({ coin, withSymbol }) {
  return (
    <Flex align="center">
      <img
        style={{ width: 40, marginRight: 10 }}
        src={coin.icon}
        alt={coin.name}
      />

      <Typography.Title level={2} style={{ margin: 0 }}>
        {withSymbol && <span>({coin.symbol})</span>} {coin.name}
      </Typography.Title>
    </Flex>
  );
}
