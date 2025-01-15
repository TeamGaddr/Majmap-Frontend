export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white">
      <div className="p-4 text-lg font-bold">Sidebar</div>
      <ul>
        <li className="p-4 hover:bg-gray-700 cursor-pointer">Home</li>
        <li className="p-4 hover:bg-gray-700 cursor-pointer">About</li>
        <li className="p-4 hover:bg-gray-700 cursor-pointer">Services</li>
        <li className="p-4 hover:bg-gray-700 cursor-pointer">Contact</li>
      </ul>
    </div>
  );
}
