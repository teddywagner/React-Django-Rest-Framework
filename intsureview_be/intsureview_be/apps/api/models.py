from django.db import models

# Model for the form.
# Parsed the flexible field into a boolean field
# I kept the move_in_date field as a string since it is only accurate to the day, not the time
# This does not account for timezones and that would need to be implemented as we scaled
class Form(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    phone_number = models.CharField(max_length=10)
    move_in_date = models.CharField(max_length=30)
    flexible = models.BooleanField(default=False)

    # I needed to add an ordering to make the returned information deterministic
    class Meta:
        ordering = ["id"]