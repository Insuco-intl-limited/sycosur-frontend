"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetUserQuery } from "@/lib/redux/features/auth/authApiSlice";

export default function ProfilePage() {
	const { data: user, isLoading, error } = useGetUserQuery();

	if (isLoading) {
		return (
			<div className="p-6">
				<Card className="p-6">
					<div className="flex items-center space-x-4">
						<Skeleton className="h-16 w-16 rounded-full" />
						<div className="space-y-2">
							<Skeleton className="h-4 w-[200px]" />
							<Skeleton className="h-4 w-[150px]" />
						</div>
					</div>
				</Card>
			</div>
		);
	}

	if (error || !user) {
		return (
			<div className="p-6">
				<Card className="p-6">
					<p className="text-red-500">Error loading user profile</p>
				</Card>
			</div>
		);
	}

	return (
		<div className="p-6">
			<Card className="p-6">
				<div className="flex items-center space-x-4">
					<Avatar className="h-16 w-16">
						<AvatarImage src={user?.avatar} alt={user.first_name} />
						<AvatarFallback>{user.first_name[0].toUpperCase()}</AvatarFallback>
					</Avatar>
					<div>
						<h1 className="text-2xl font-bold">{user.username}</h1>
						<p className="text-gray-500">{user.email}</p>
						{user.first_name && user.last_name && (
							<p className="text-gray-700">
								{user.first_name} {user.last_name}
							</p>
						)}
					</div>
				</div>
			</Card>
		</div>
	);
}
