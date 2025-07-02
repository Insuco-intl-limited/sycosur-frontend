"use client";

import { GoogleLogin } from "@/utils";
import OauthButton from "@/components/shared/OauthButtton";
import {GoogleIcon} from "@/components/shared/GoogleIcon";

export default function OauthButtons() {
	return (
		<div className="mt-3 flex items-center justify-between gap-2">
			<OauthButton provider="google" onClick={GoogleLogin}>
				  <GoogleIcon className="w-5 h-5 mr-2" />
  					Continue with Google

			</OauthButton>
		</div>
	);
}