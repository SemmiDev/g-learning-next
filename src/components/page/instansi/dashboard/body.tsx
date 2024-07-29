import ProfileCard from './profile-card'

export default function DashboardBody() {
  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <div className="flex flex-col w-full lg:w-7/12">
        <ProfileCard />
      </div>
      <div className="flex flex-col flex-1 bg-green-200">kanan</div>
    </div>
  )
}
