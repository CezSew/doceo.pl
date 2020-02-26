<style>
	body, html {
		margin: 0;
	}
	.loader-container {
		display: flex;
		justify-content: center;
		align-items: center;
		background: linear-gradient(90deg, #543884 0%, #A13670 100%);
		background-size: 400% 400%;
		animation: backgroundGradient 8s ease infinite;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}
	.lds-ellipsis {
		display: inline-block;
		position: relative;
		width: 80px;
		height: 80px;
	}
	.lds-ellipsis div {
		position: absolute;
		top: 33px;
		width: 13px;
		height: 13px;
		border-radius: 50%;
		background: #fff;
		animation-timing-function: cubic-bezier(0, 1, 1, 0);
	}
	.lds-ellipsis div:nth-child(1) {
		left: 8px;
		animation: lds-ellipsis1 0.6s infinite;
	}
	.lds-ellipsis div:nth-child(2) {
		left: 8px;
		animation: lds-ellipsis2 0.6s infinite;
	}
	.lds-ellipsis div:nth-child(3) {
		left: 32px;
		animation: lds-ellipsis2 0.6s infinite;
	}
	.lds-ellipsis div:nth-child(4) {
		left: 56px;
		animation: lds-ellipsis3 0.6s infinite;
	}
	@keyframes lds-ellipsis1 {
		0% {
			transform: scale(0);
		}
		100% {
			transform: scale(1);
		}
	}
	@keyframes lds-ellipsis3 {
		0% {
			transform: scale(1);
		}
		100% {
			transform: scale(0);
		}
	}
	@keyframes lds-ellipsis2 {
		0% {
			transform: translate(0, 0);
		}
		100% {
			transform: translate(24px, 0);
		}
	}

	@keyframes backgroundGradient {
		0% {
			background-position: 0% 50%;
		}
		50% {
		background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
		
	}
</style>