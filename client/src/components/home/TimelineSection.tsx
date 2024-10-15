import styles from "../../css/home/TimelineSection.module.scss";
import Text from "../shared/Text";
import Timeline from "./Timeline";
import TimelineDot from "./TimelineDot";
import TimelinePath from "./TimelinePath";
import TimelineItem from "./TimelineItem";
import TimelineContent from "./TimelineContent";
import TimelineConnector from "./TimelineConnector";

const TimelineSection = () => {
	return (
		<div className={styles.TimelineSection}>
			{/* TIMELINE */}
			<Timeline>
				<TimelineItem>
					<TimelineConnector>
						<TimelineDot type="solid" color="blue" />
						<TimelinePath />
					</TimelineConnector>
					<TimelineContent>
						<Text color="var(--blueGrey600)" size="4">
							<b>Application Developer</b> - 2021-Present - Eldermark (LivTech)
						</Text>
						<Text size="6" color="var(--nav-text)">
							Worked in sprint-base Agile work-flow scoping, designing &
							building out the flagship software product for an industry
							adjacent to healthcare. Involved working acroll multiple different
							internal projects including VueJS, React, AngularJS and SQL.
						</Text>
					</TimelineContent>
				</TimelineItem>
				<TimelineItem>
					<TimelineConnector>
						<TimelineDot type="flat" color="blue" />
						<TimelinePath />
					</TimelineConnector>
					<TimelineContent>
						<Text color="var(--blueGrey600)" size="4">
							<b>Developer</b> - 2018-2021 - AL Advantage LLC.
						</Text>
						<Text size="6" color="var(--nav-text)">
							Worked at AL Advantage LLC building propiertary software for the
							healthcare industry. Built a public-facing user administration
							portal with Single-Sign-On. Design & built an internal portal for
							ease of business reports & metrics.
						</Text>
					</TimelineContent>
				</TimelineItem>
				<TimelineItem>
					<TimelineConnector>
						<TimelineDot type="flat" color="green" />
						<TimelinePath />
					</TimelineConnector>
					<TimelineContent>
						<Text color="var(--blueGrey600)" size="4">
							<b>Contractor</b> - 2017-2018 - Echo-Alchemist Designs
						</Text>
						<Text size="6" color="var(--nav-text)">
							Ran a sole-proprietor contracting service that offered various
							development & hosting related services including greenfield
							projects, revamps, ongoing service maintenance & site management.
							I was in charge of meeting with customers, scoping out the
							customer's needs and the project requirements & building/servicing
							the product upon request.
						</Text>
					</TimelineContent>
				</TimelineItem>
				<TimelineItem>
					<TimelineConnector>
						<TimelineDot type="flat" color="purple" />
						<TimelinePath />
					</TimelineConnector>
					<TimelineContent>
						<Text color="var(--blueGrey600)" size="4">
							<b>Server Tech II</b> - 2017-2018 - Bluehost (Endurance)
						</Text>
						<Text size="6" color="var(--nav-text)">
							Worked in a loose "Agile" environment managing regular support
							requests for various server/hosting-related issues & demands. Such
							requests consisted of security patches, software updates,
							composing load balancing tests & mapping out various automation
							tools for server health & site reliability.
						</Text>
					</TimelineContent>
				</TimelineItem>
				{/*  */}
			</Timeline>
			{/*  */}
		</div>
	);
};

export default TimelineSection;
