export default function AddressShorten({address}: {address: string}) {
    return (
      <div>{`${address.slice(0, 6)}...${address.slice(-4)}`}</div>
    );
}