import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useEffect } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { connectWallets } from '../helpers/staticData';

import Modal from './Modal';

interface Props {
  showModal: boolean;
  onCloseModal?: () => void;
}

const LoginModal = ({ showModal, onCloseModal = () => null }: Props) => {
  const { t } = useTranslation();

  const { connector: currentConnector } = useAccount();
  const { disconnectAsync: disconnect } = useDisconnect();
  const { connectors, connect, isSuccess: isWalletConnected, error: connectError } = useConnect();

  async function handleConnectWallet(walletId: string) {
    await disconnect();
    connect({
      connector: connectors.find((connector) => connector.id === walletId),
      chainId: currentConnector?.id === 'walletConnect' ? 137 : undefined,
    });
  }

  useEffect(() => {
    if (isWalletConnected || connectError?.name === 'ConnectorAlreadyConnectedError') {
      onCloseModal();
    }
  }, [isWalletConnected, connectError]);

  return (
    <Modal showModal={showModal} className="glass-effect" onCloseModal={onCloseModal}>
      <div className="flex flex-col justify-center items-center px-28 py-12">
        <h2 className="text-mds-white font-semibold text-[2.5rem] mb-10">
          {t('MODAL_CONNECT_WALLET_TITLE')}
        </h2>
        <div className="flex gap-x-16 w-ful mb-14">
          {connectWallets.map((wallet) => (
            <a
              key={wallet.id}
              className="flex flex-col cursor-pointer group hover:scale-105 gap-y-2 items-center justify-center duration-300"
              onClick={() => {
                handleConnectWallet(wallet.id);
              }}
            >
              <div className="flex bg-mds-white w-[7.5rem] h-[7.5rem] rounded-[1.5rem] justify-center items-center">
                <div className="absolute group-hover:scale-105 w-[4rem] h-[4rem] duration-700">
                  <Image alt={wallet.image} src={`/assets/${wallet.image}.svg`} layout="fill" />
                </div>
              </div>
              <span className="text-xl font-medium text-mds-white text-center">{wallet.name}</span>
            </a>
          ))}
        </div>
        <div>
          <span className="font-light text-mds-white text-lg">
            {t('MODAL_CONNECT_WALLET_LEARN_MORE1')}
          </span>
          <a className="cursor-pointer">
            <span className="font-light text-lg text-mds-cyan">
              {t('MODAL_CONNECT_WALLET_LEARN_MORE2')}
            </span>
          </a>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
