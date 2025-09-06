import OSRMv1 from '../src/osrm-v1';
import Waypoint from '../src/waypoint';

describe('L.Routing.OSRMv1', () => {
  describe('#route', () => {
    const waypoints = [
      new Waypoint([57.73, 11.94]),
      new Waypoint([57.7, 11.9]),
    ];
    it.skip('returns correct waypoints', async () => {
      const router = new OSRMv1();
      const routes = await router.route(waypoints);
      waypoints.forEach((wp, i) => {
        const returnedWp = routes[0].waypoints[i];
        const returnedLatLng = returnedWp.latLng as L.LatLng;
        const waypointLatLng = wp.latLng as L.LatLng;
        expect(Math.abs(returnedLatLng.lat - waypointLatLng.lat)).toBeLessThan(
          0.1,
        );
        expect(Math.abs(returnedLatLng.lng - waypointLatLng.lng)).toBeLessThan(
          0.1,
        );
      });
    });
  });
});
