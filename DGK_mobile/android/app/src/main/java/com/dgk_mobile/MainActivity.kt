import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.ConcurrentReactActivityDelegate;

public class MainActivity extends ReactActivity {
    @Override
    protected String getMainComponentName() {
        return "DGK_mobile";
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ConcurrentReactActivityDelegate(this, getMainComponentName());
    }
}