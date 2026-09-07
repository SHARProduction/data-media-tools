export const evaluators={
  'recording-storage-estimator': i=>{const mb=Number(i.bitrateMbps)*Number(i.cameras)*Number(i.durationMinutes)*60/8,total=mb/1000*(1+Number(i.headroomPercent||0)/100);return{valid:total>0,estimatedGb:+total.toFixed(2),perCameraGb:+(total/Number(i.cameras)).toFixed(2)}},
  'backup-throughput-planner': i=>{const total=Number(i.volumeGb)*1000*Number(i.copies||1),minutes=total/Number(i.throughputMBps)/60;return{valid:total>0&&Number(i.throughputMBps)>0&&minutes<=Number(i.availableMinutes),requiredMinutes:+minutes.toFixed(2),marginMinutes:+(Number(i.availableMinutes)-minutes).toFixed(2)}}
};
export function evaluate(slug,input){const fn=evaluators[slug];if(!fn)throw new Error('Unknown tool');return fn(input)}
