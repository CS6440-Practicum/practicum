# Dexercise Application Manual

This document will tell you everything you need to know to start using Dexercise as a user.  Here's what we'll cover:

- Team and Project Info
- What is Dexercise?
- Who can use Dexercise?
- How do I access Dexercise?
- How do I use Dexercise?
- Is my data safe?

## Team and Project Info

**Team name:** Glucose-Tracker

**Team members:** Jonathan Marple, Evan Strat

**Project name:** Dexercise

**Github link:** https://github.com/CS6440-Practicum/practicum

## What is Dexercise?

Dexercise is a web application designed to help people living with type one diabetes (T1D) make better treatment decisions when exercising.  Since the exact ways in which exercise affects blood sugar levels are still ill-defined, some people with T1D are reluctant to exercise out of fear of having low or high blood sugar levels (Skoler & Biba, 2020).

Dexercise is one of the only applications available right now that lets you combine your exercise and continuous glucose monitor (CGM) data.  (By using a small sensor inserted under the skin, a CGM can estimate blood sugar levels using the interstitial fluid between cells (“Continuous Glucose Monitoring,” n.d.).  CGMs provide these blood sugar estimates every 5 minutes (“How It Works,” n.d.).)  Using this additional information, you can better understand how the actions you take before or during exercise, such as adjusting your insulin doses or eating carbohydrates, affect your blood sugar before, during, and after exercise.

Of course, Dexercise is _not_ providing you with medical advice.  Please ask your doctor if you have questions and before you change your diabetes treatment.

## Who can use Dexercise?

Dexercise is a free web application aimed at people with type one diabetes.  However, anyone can use the application as long as they meet the following technical requirements:

- Use a Dexcom continuous glucose monitor
- Use Google Fit
- Consent to sharing your Google Fit and Dexcom data with our application so we can show you your data

## How do I access Dexercise?

You can access Dexercise using any modern web browser at https://dexercise.herokuapp.com.  We've tested the application in Google Chrome on both Windows and Mac, but it should work on other systems, too.

## How do I use Dexercise?

Begin by accessing the Dexercise website at the URL in the section above.

### Signing into your Google Account

To use Dexercise, you'll first sign into your Google account, which will allow us to access your data in Google Fit.  Follow the steps below to sign in:

1. Go to https://dexercise.herokuapp.com

2. A prompt appears to sign into Google.  Click the blue **Sign in with Google** button, then follow the prompts from Google to select your Google account.

![Google signin prompt](https://user-images.githubusercontent.com/5790137/115498002-b5648a00-a23a-11eb-978b-effaf78f3c99.png)

![Google signin email prompt](https://user-images.githubusercontent.com/5790137/115498339-623f0700-a23b-11eb-993d-63fda312d5ec.png)

3. A page may appear warning you that the app is unverified.  Since we are still in the testing phases, our application has not been verified by Google.  However, you can click **Advanced** link, then the link to **Go to <ADD URL HERE> (unsafe)** to bypass the warning.

![Unverified app warning from Google](https://user-images.githubusercontent.com/5790137/115498304-55baae80-a23b-11eb-91d4-f9ce035681f6.png)
  
4. If prompted to consent to sharing your Google Account or Google Fit data, choose **Allow** (if you consent) to continue the sign in process.

### Signing into your Dexcom account

After you've successfully signed into your Google account, the next step is to authorize access to your CGM data from Dexcom:

![Dexercise prompt for Dexcom signin](https://user-images.githubusercontent.com/5790137/115498635-f27d4c00-a23b-11eb-85ef-7058c320b8c1.png)

1. Start by clicking the big, green **Connect your Dexcom account** button.
2. We are currently using the Dexcom sandbox API, so you will just see a dropdown of users to pick from.  In a real application, users would enter their Dexcom account username and password on this screen.
3. To continue, select **SandboxUser5** or **SandboxUser6** from the dropdown, then click **Login**.
4. On the authorization screen that appears, if you consent to sharing your Dexcom data with Dexercise, enter your electronic signature, then click **Authorize**.

If you see a screen with a graph, then you've successfully signed into your Google and Dexcom accounts.  Read on to learn how to use this screen!

![Dexercise's Exercise Impact Chart](https://user-images.githubusercontent.com/5790137/115981975-a5fc7e00-a565-11eb-8a7b-13cfb56b5ac6.png)


### Interpreting the Dexercise graph

**NOTE:** Dexercise does not provide medical advice, and the accuracy of the information shown cannot be guaranteed. Many factors beyond exercise can affect your blood sugar.  Please consult a medical professional before making adjustments to your diabetes treatment regimen.

Dexercise aims to allow you view Heart Points from Google Fit alongside your Dexcom CGM readings to visualize how exercise could be influencing your blood sugar levels. All data is shown in your local timezone.

The red bars on the graph represent Google Fit Heart Points, which indicate the _intensity_ of exercise at a given point in time.  The **right axis** shows the Heart Point scale, from 0 to 10, with 10 being the most active.

The black line on the graph is your estimated glucose values (EGVs) provided by your Dexcom CGM.  The **left axis** shows the range of possible EGVs, from 40 to 400 ("GET /egvs", n.d.).  Keep in mind that any inaccuracies or periods of missing data from your Dexcom CGM will also appear in any graphs that appear in Dexercise.

## Is my data safe?

Dexercise includes multiple safeguards to protect your data.

Safeguards that we've already implemented:

- Dexercise is securely hosted on Heroku
- Dexercise does not store any data from Google or Dexcom beyond a minimal amount of information used to authenticate you (internal identifiers and tokens) and greet you (your name and email)

If Dexercise were to be used in the real world, we would take the following additional steps:

- Ensure that the application and any technologies hosting it are HIPAA compliant
- Delete user authentication details after users logout or are inactive
- Write a full Terms of Service and Privacy Policy

# References

_Continuous glucose monitoring._ (n.d.). National Institute of Diabetes and Digestive and Kidney Diseases. Retrieved April 18, 2021, from https://www.niddk.nih.gov/health-information/diabetes/overview/managing-diabetes/continuous-glucose-monitoring

_GET /egvs._ (n.d.). Dexcom. Retrieved April 25, 2021, from https://developer.dexcom.com/get-egvs

_How it works._ (n.d.). Dexcom. Retrieved April 18, 2021, from https://www.dexcom.com/g6/how-it-works

Skoler, E., & Biba, U. (2020, October 5). _Exercise and type 1 diabetes: Chance to participate in a large-scale, real-world study._ diaTribe. Retrieved April 18, 2021, from https://diatribe.org/exercise-and-type-1-diabetes-chance-participate-large-scale-real-world-study
